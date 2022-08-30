const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('tabaophuc', 'root',null, {
  host: 'localhost',
  dialect: 'mysql'
});