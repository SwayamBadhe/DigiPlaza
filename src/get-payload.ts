import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import payload, { Payload } from 'payload';
import type { InitOptions } from 'payload/config';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
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

export const getPayLoadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is not missing');
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: 'onboarding@resend.com',
        fromName: 'DigiPlaza',
      },
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
