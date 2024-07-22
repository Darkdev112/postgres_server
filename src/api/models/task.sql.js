const {DataTypes, Model}  = require('sequelize')
const {sequel} = require('../db/sqldb')
const {v4 : uuidv4} = require('uuid')

class Task extends Model{}
Task.init({
    taskId : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        allowNull : false,
        primaryKey : true,
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
    }
},{
    sequelize : sequel,
    modelName : 'tasks',
    timestamps : false,
    freezeTableName : true,
})


module.exports = Task