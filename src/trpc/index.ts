import { z } from 'zod';
import { authRouter } from './auth-router';
import { publicProcedure, router } from './trpc';
import { QueryValidator } from '../lib/validators/query-validator';
import { getPayLoadClient } from '../get-payload';

/**
 * a public procedure refers to a procedure that is accessible and callable from the client-side code.
 * Procedures are functions or methods defined on the server that the client can invoke remotely.
 */
export const appRouter = router({
  auth: authRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOptions } = query;

      const payload = await getPayLoadClient();

      const parsedQueryOptions: Record<string, { equals: string }> = {};

      Object.entries(queryOptions).forEach(([key, value]) => {
        parsedQueryOptions[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOptions,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

/**
 * Export type definition of API
 */
export type AppRouter = typeof appRouter;
