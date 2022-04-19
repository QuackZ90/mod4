const express = require('express');
const router = express.Router();
const {userController} = require('../../controller');
const {validateCreateUser, validateLogin} = require('../../middleware/dataValidator');

router.use((req, res, next)=>{
    console.log(`user route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.get('/',userController.existingUser);

router.post('/', validateCreateUser, userController.create);

router.post('/session', validateLogin, userController.login);


module.exports=router;