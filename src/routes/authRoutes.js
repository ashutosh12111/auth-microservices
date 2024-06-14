const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { UserRegisterSchema, UserLoginSchema } = require('../schema/userSchema');
const validationMiddleware = require('../middleware/validationMiddleware');
// const { validationMiddleware } = require('../middleware/validationMiddleware');



router.post('/register',validationMiddleware(UserRegisterSchema), authController.registerExpress);
router.post('/login',validationMiddleware(UserLoginSchema), authController.login);
router.get('/verify-token', authController.verifyToken);



module.exports = router