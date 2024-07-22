const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const {User} = require('../models')


const createUser = async (req,res) => {
    try {
        const {name , email, password} = req.body

        const existingUser = await User.findOne({where : {email}})
        if(existingUser){
            return res.status(400).send({msg : "User already exists"})
        }

        const encryptedPassword = await bcrypt.hash(password,10)

        const newUser = User.build({
            name : name,
            email : email,
            password : encryptedPassword
        })       
        await newUser.save()
        
        res.status(201).send({user : newUser})
    } catch (error) {
        res.status(400).send("Could not create user")
    }
}

const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        
        const existingUser = await User.findByCredentials(email,password);
        
        const authToken  = await existingUser.generateToken();


        res.status(200).send({token : authToken})
    } catch (error) {
        res.status(400).send(error)
    }
}

const getUsers = async (req,res) => {
    try {
        const existingUser = await User.findOne({
            attributes : ['userId', 'name', 'email']
        });

        res.status(200).send({users : existingUser})
    } catch (error) {
        res.status(400).send("Could not get users")
    }
}

module.exports = {
    createUser,
    getUsers,
    loginUser
}