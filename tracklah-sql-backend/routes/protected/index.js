const express = require('express');
const router = express.Router();
const jwtAuthenticate = require('../../middleware/jwtAuthenticate');

const userRouter = require('./user.routes');

router.use((req, res, next)=>{
    console.log(`protected route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.use(jwtAuthenticate);

router.use('/user', userRouter);


module.exports=router;