import { authRouter } from './auth-router';
import { router } from './trpc';

/**
 * a public procedure refers to a procedure that is accessible and callable from the client-side code.
 * Procedures are functions or methods defined on the server that the client can invoke remotely.
 */
export const appRouter = router({
  auth: authRouter,
});

/**
 * Export type definition of API
 */
export type AppRouter = typeof appRouter;
