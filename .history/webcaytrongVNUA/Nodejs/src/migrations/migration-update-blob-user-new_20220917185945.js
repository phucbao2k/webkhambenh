

module.exports ={
    up:(queryInter, Sequelize)=>{
        return Promise.all([
            queryInter.changeColumn('Users', 'image',{
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },
    down: (queryInter, Sequelize)=>{
        return Promise.all([
            queryInter.changeColumn('Users', 'image',{
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
}