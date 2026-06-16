import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8080),

  app: {
    keys: env.array('APP_KEYS'),
  },

  admin: {
    serveAdminPanel: true,
  },
});

export default config;
