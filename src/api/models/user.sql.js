const {DataTypes, Model}  = require('sequelize')
const {sequel} = require('../db/sqldb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const {v4 : uuidv4} = require('uuid')

class User extends Model{
    static async findByCredentials(email,password){
        const existingUser = await this.findOne({
            where : {
                email :email
            }
        })
        if(!existingUser){
            throw new Error("User not found")
        }
        
        const isValidPassword = await bcrypt.compare(password , existingUser.password)
        if(!isValidPassword){
            throw new Error("Password is incorrect")
        }
        
        return existingUser
    }

    async generateToken(){
        const token = jwt.sign({name : this.name, email : this.email}, config.jwt_secret)
        this.tokens = this.tokens.concat(token)

        await this.save()
        return token
    }
}
User.init({
    userId : {
        type : DataTypes.UUID,
        defaultValue : uuidv4(),
        allowNull : false,
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    tokens : {
        type : DataTypes.ARRAY(DataTypes.STRING),
        defaultValue : []
    },
    newfield :{
        type : DataTypes.STRING,
        defaultValue : "yo"
    }
},{
    sequelize : sequel,
    modelName : 'users',
    timestamps : false,
    freezeTableName : true
})


module.exports = User