import next from 'next';

const PORT = Number(process.env.PORT) || 3000;

export const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  port: PORT,
});

/**
 * The request handler is a function responsible for handling incoming HTTP requests
 * and routing them to the appropriate Next.js pages or API routes based on the project's
 *  file structure and routing conventions.
 */
export const nextHandler = nextApp.getRequestHandler();
