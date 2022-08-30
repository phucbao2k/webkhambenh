const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tabaophuc', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});