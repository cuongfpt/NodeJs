const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController')
const {checkPermission}  = require('../middlewares/checkPermission')

router.get('/:id', usersController.getUserDetail)
// router.get('/', usersController.getAllUsers)
router.post('/signIn', usersController.signInUser)
router.post('/', usersController.signUpUser)
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleleUser);

router.get('/', usersController.getAllUsers)

module.exports = router;