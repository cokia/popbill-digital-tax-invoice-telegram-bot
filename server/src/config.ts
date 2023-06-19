import { logger } from '@asapjs/core';

import packageJson from '../package.json';
require('dotenv').config({ path: `${__dirname}/../.env` });

const debug = ['local', 'development'].includes(process.env.NODE_ENV || 'production');
const port = 3000;

/* ------------------------ middleware import ------------------------ */
/* ------------------------------------------------------------------- */
export default {
  debug,
  projectName: packageJson.name,
  basePath: '',
  extensions: ['@asapjs/sequelize', '@asapjs/console'],
  port,

  auth: {
    jwt_access_token_secret: 'jwtsecretforeaccess',
    jwt_access_token_life: '365d',
    jwt_refresh_token_secret: 'jwtsecretforrefresh',
    jwt_refresh_token_life: '365d',
  },
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: (query: string, time: number) => {
      if (!query.includes(': SELECT')) {
        logger.debug(`${query}`);
      }
    },
    timezone: '+09:00',
    pool: {
      max: 20,
      idle: 4800,
      acquire: 60000,
    },
  },
  swagger: {
    name: packageJson.name,
    version: packageJson.version,
    scheme: debug ? 'http' : 'https',
    host: debug ? `localhost:${port}` : 'tax-server.a-fin.co.kr',
    auth_url: '/auth/login',
    useAuth: true,
  },
  aws: {
    s3: {
      bucket_name: process.env.AWS_S3_BUCKET_NAME || '',
      cloudfront_url: process.env.AWS_CLOUDFRONT_URL || '',
      region: process.env.AWS_REGION || 'ap-northeast-2',
      access_key: process.env.AWS_ACCESS_KEY || '',
      secret_key: process.env.AWS_SECRET_KEY || '',
    },
  },
  sentry: {
    dsn: 'https://@.ingest.sentry.io/',
    environment: process.env.NODE_ENV,
  }
};
