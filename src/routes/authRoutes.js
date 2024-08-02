const express = require('express');
const router = express.Router();
const multer = require('multer');

const authController = require('../controllers/authController');
const { UserRegisterSchema, UserLoginSchema } = require('../schema/userSchema');
const validationMiddleware = require('../middleware/validationMiddleware');
// const { validationMiddleware } = require('../middleware/validationMiddleware');



const upload = multer();  // Set up multer to handle multipart/form-data

// Apply multer to handle form-data for all routes in this router
router.use(upload.none());

router.post('/register',validationMiddleware(UserRegisterSchema), authController.registerExpress);
router.post('/login',validationMiddleware(UserLoginSchema), authController.login);
router.get('/verify-token', authController.verifyToken);



module.exports = router