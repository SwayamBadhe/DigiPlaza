import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { getPayLoadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/account-credentails';
import { publicProcedure, router } from './trpc';

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayLoadClient();

      /**
       * check if user already exists
       */
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayLoadClient();

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });

      if (!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });

      return { success: true };
    }),

  SignIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayLoadClient();

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }
    }),
});
