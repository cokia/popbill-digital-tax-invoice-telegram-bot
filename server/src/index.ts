import { Application, logger } from '@asapjs/core';

import config from './config';

logger.info(`DATABASE HOST : ${config.db.host}`);

new Application(__dirname, config).run();
