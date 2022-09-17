const { QueryInterface, Sequelize } = require("sequelize/types");

module.exports ={
    up:(QueryInterface, Sequelize)=>{
        return Promise.all([
            QueryInterface.changeColumn('Users', 'image',{
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },
    down: (QueryInterface, Sequelize)=>{
        return Promise.all([])
    }
}