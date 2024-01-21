import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { buildConfig } from 'payload/config';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [],
  routes: {
    admin: '/sell',
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- DigiPlaza',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});

/**
 * A bundler's main goal is to take a bunch of files and turn them into a few optimized files that you ship to the browse
 */
/**
 * Payload is a headless content management system (CMS) that provides an admin interface for managing content.
 * The Payload admin interface is a web-based dashboard where administrators and content creators can perform
 * various content management tasks without directly interacting with the underlying database or codebase.
 */
