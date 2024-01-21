import dotenv from 'dotenv';
import path from 'path';
import payload from 'payload';
import type { InitOptions } from 'payload/config';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

// Partial<T> is a utility type in TypeScript that makes all properties of the original type T optional.
interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayLoadClient = async ({ initOptions }: Args = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not missing');
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      /**
       * Payload uses this secret key to generate secure user tokens (JWT).
       */
      secret: process.env.PAYLOAD_SECRET,
      /**
       * This line essentially controls whether Payload should start in local-only mode (local: true) or not (local: false).
       * If initOptions.express is provided, it means that Payload is being integrated into an existing Express app,
       * so local is set to false. If not, it defaults to true.
       */
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
