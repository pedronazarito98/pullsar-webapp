import type { Core } from '@strapi/strapi';

const health = ({ strapi }: { strapi: Core.Strapi }) => ({
  async check(ctx) {
    try {
      // Test database connection
      await strapi.db.connection.raw('SELECT 1');

      ctx.body = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: strapi.config.get('info.strapi'),
      };
    } catch (error) {
      ctx.status = 503;
      ctx.body = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      };
    }
  },
});

export default health;
