import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '.';

/**
 * Creating a TRPC context for React
 */
export const trpc = createTRPCReact<AppRouter>({});
