const User = require('./user.sql')
const Task = require('./task.sql')

//associations
User.hasMany(Task, {
    foreignKey : 'userId'
})
Task.belongsTo(User,{
    foreignKey : 'userId'
})

module.exports = {
    User,
    Task
}