import { User } from '@/payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdminorHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === 'admin') return true;

    /**
     * Only allow access to images that are owned by the user
     * This is done by checking if the user id matches the user field on the media
     * which is set in the beforeChange hook
     * Here user referes to the user field on the media
     */
    return {
      user: {
        equals: req.user.id,
      },
    };
  };

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      /**
       * If the user is not logged in,
       * or the referer does not include 'sell', return true
       */
      if (!req.user || !referer?.includes('sell')) {
        return true;
      }

      return await isAdminorHasAccessToImages()({ req });
    },
    delete: isAdminorHasAccessToImages(),
    // same as delete: ({req}) => isAdminorHasAccessToImages()({req}),
    update: isAdminorHasAccessToImages(),
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};
