const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tabaophuc', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});