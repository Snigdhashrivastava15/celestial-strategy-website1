export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080',
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-secret-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  rateLimit: {
    ttl: parseInt(process.env.API_RATE_LIMIT_TTL || '60', 10),
    max: parseInt(process.env.API_RATE_LIMIT_MAX || '100', 10),
  },
});
