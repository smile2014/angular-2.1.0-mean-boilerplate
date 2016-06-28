import * as path from 'path';
import {getNodeEnv} from '../utils/express-utils';

const appName = 'playlistHeaven';

export let config = {
  cookieSecret: 'default',
  tokenSecret: 'default',
  db: `mongodb://localhost/${appName}-${getNodeEnv()}`,
  env: getNodeEnv(),
  port: 3000,
  root: path.normalize(__dirname + '/../../..')
};