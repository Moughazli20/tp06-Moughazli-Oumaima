const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_k9rq', 'database_k9rq_user', 'GohCCRmW7bLHThkV1qPg5Joq7IC98ggH', {
    host: 'dpg-cm23i5nqd2ns73d8e7o0-a.frankfurt-postgres.render.com',
    dialect: 'postgres',
    port: '5432',
    dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false 
        }
      }
});

module.exports = sequelize;