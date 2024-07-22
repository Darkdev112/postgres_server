const {Router} = require('express')
const {userController} = require('../controllers')

const router = Router()

router.post('/createuser', [] , userController.createUser)
router.post('/loginuser', [], userController.loginUser)
router.get('/getusers',[], userController.getUsers)


module.exports = router