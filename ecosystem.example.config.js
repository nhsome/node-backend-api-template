module.exports = {
  apps : [{
    name      : 'project',
    script    : 'index.js',
    watch: true,
    ignore_watch : ["node_modules", "app/static", "frontend", ".git"],
    env: {
        NODE_ENV: 'development',
        SERVERPORT: 8080,
        HOST: 'localhost',
        USER: 'user',
        PASSWORD: '123',
        DATABASE: 'ga_erp',
        JWT_SECRET: 'aaaa',
        JWT_MAX_AGE: 3600 * 24,
    },
    env_production : {
        NODE_ENV: 'production',
        SERVERPORT: 48655,
        HOST: 'localhost',
        USER: 'user',
        PASSWORD: '123',
        DATABASE: 'ga_erp',
        JWT_SECRET: 'aaaa',
        JWT_MAX_AGE: 3600 * 24,
    }
  }, {
      name      : 'project-kue-UI',
      script    : 'node_modules/kue/bin/kue-dashboard',
      watch: false,
      env: {

      },
      env_production : {

      }
  },
      // {
      //     name: 'SOME-COMMAND',
      //     script: 'app/console/index.js',
      //     args: "-e 'check-servers'",
      //     autorestart: false,
      //     instances: 1,
      //     exec_mode: 'fork',
      //     env_development: {
      //         NODE_ENV: 'development',
      //         SERVERPORT: 8081,
      //         HOST: 'host',
      //         USER: 'user',
      //         PASSWORD: 'password',
      //         DATABASE: 'db',
      //         JWT_SECRET: 'wervwe45524dfv'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production',
      //         SERVERPORT: 8082,
      //         HOST: 'host',
      //         USER: 'user_prod',
      //         PASSWORD: 'password_prod',
      //         DATABASE: 'db_prod',
      //         JWT_SECRET: 'gvwrgvwerv3434'
      //     }
      // },
      // {
      //     name      : 'SOME-WORKER',
      //     script    : 'app/workers/SOME-WORKER.js',
      //     watch: true,
      //     ignore_watch : ["node_modules", "app/static", "frontend", ".git"],
      //     instances : -1,//CPU CORES - 1
      //     env_development: {
      //         NODE_ENV: 'development',
      //         SERVERPORT: 8081,
      //         HOST: 'host',
      //         USER: 'user',
      //         PASSWORD: 'password',
      //         DATABASE: 'db',
      //         JWT_SECRET: 'wervwe45524dfv'
      //     },
      //     env_production: {
      //         NODE_ENV: 'production',
      //         SERVERPORT: 8082,
      //         HOST: 'host',
      //         USER: 'user_prod',
      //         PASSWORD: 'password_prod',
      //         DATABASE: 'db_prod',
      //         JWT_SECRET: 'gvwrgvwerv3434'
      //     }
      // },
  ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy': 'npm install && pm2 restart ecosystem.config.js --only project --env production'
    }
  }
};
