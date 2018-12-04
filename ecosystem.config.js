module.exports = {
  apps : [
      {
        name      : 'ga-erp',
        script    : 'index.js',
        watch: true,
        ignore_watch : ["node_modules", "app/static", "frontend", ".git"],
        env: {
            NODE_ENV: 'development',
            SERVERPORT: 8082,
            HOST: 'localhost',
            USER: 'root',
            PASSWORD: '123321',
            DATABASE: 'ga_erp',
            JWT_SECRET: 'L3AecCcxzvq9uHJMm3xc',
            JWT_MAX_AGE: 3600 * 24,
        },
        env_production : {
            NODE_ENV: 'production',
            SERVERPORT: 48655,
            HOST: 'localhost',
            USER: 'root',
            PASSWORD: '123',
            DATABASE: 'ga_erp',
            JWT_SECRET: 'L3AecCcxzvq9uHJMm3xc',
            JWT_MAX_AGE: 3600 * 24,
        }
      },
      {
          name      : 'ga-erp-kue-UI',
          script    : 'node_modules/kue/bin/kue-dashboard',
          watch: false,
          env: {

          },
          env_production : {

          }
      }
  ],

  deploy : {
    production : {
      user : 'deploy',
      host : '178.128.194.71',
      ref  : 'origin/master',
      repo : 'git@gitlab.office.alfaleads.ru:nhsome/site-checker2.git',
      path : '/var/www/NODES/site-checker2',
      'post-deploy': 'npm install && pm2 restart ecosystem.config.js --only site-checker2 --env production && ' +
        'pm2 restart ecosystem.config.js --only site-checker2-checkSiteWorker --env production &&' +
        'cd frontend && npm install && npm run build'
    }
  }
};
