import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

export default {
  nodeEnv: process.env.NODE_ENV,
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  mariaDB: {
    dbname: process.env.MARIADB_DATABASE,
    user: process.env.MARIADB_USER,
    pass: process.env.MARIADB_PASSWORD,
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
  },
  /**
   * Your secret sauce
   */
  sessionSecret: process.env.SESSION_SECRET,

  redisURLSession: process.env.REDIS_URI + 1,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
