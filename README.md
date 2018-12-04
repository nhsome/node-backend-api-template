**Requirements:**
  1. node.js > 8
  2. npm
  3. mysql
  4. redis
  5. pm2 installed globally

**Firstly:** copy ecosystem.example.config.js to ecosystem.config.js and edit them

**Run:** $ npm run dev

**Start:** $ npm run start

**Create migration:** $ cd app && node ./../node_modules/sequelize-auto-migrations/bin/makemigration --name <Your name>

**Run migrations:** $ cd app && USER=root PASSWORD=123 DATABASE=ga_erp node ./../node_modules/sequelize-auto-migrations/bin/runmigration

Let's coding your controllers, models, workers and commands
