const express = require('express');
const router = express.Router();
const {userController} = require('../controller');
const {validateCreateUser, validateLogin} = require('../middleware/dataValidator');

router.use((req, res, next)=>{
    console.log(`user route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.get('/',(req, res, next)=>{
    return res.json({message:"get request successful"});
});

router.post('/', validateCreateUser, userController.create);

module.exports=router;