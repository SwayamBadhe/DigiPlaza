import { ExpressContext } from '@/server';
import { initTRPC } from '@trpc/server';

/**
 * Initialize a tRPC context with the provided ExpressContext.
 * The tRPC context is used to create a router and procedures for the API.
 * The ExpressContext typically includes information about the HTTP request and response.
 */
const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
