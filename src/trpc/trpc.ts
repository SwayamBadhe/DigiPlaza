import { initTRPC } from '@trpc/server';

/**
 *  initialize a tRPC context.
 */
const t = initTRPC.context().create();

export const router = t.router;
export const publicProcedure = t.procedure;
