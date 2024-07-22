const {Task} = require('../models')
const {v4 : uuidv4} = require('uuid')

const createTask = async (req,res) => {
    try {
        const {title, description, userId} = req.body

        const existingTask = await Task.findOne({
            where : {
                title : title
            }
        })
        if(existingTask){
            return res.status(400).send({existingTask})
        }

        const newTask = Task.build({
            title : title,
            description : description,
        })
    } catch (error) {
        res.status(400).send(error)
    }
}