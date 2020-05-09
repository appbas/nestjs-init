const { resolve } = require('path');

module.exports = {
  config: resolve(__dirname, 'src', 'core', 'database', 'config', 'database.ts'),
  'models-path': resolve(__dirname, 'src', 'core', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'core', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'core', 'database', 'seed')
};


console.log(resolve(__dirname, 'src', 'core', 'database', 'config', 'database.ts'));