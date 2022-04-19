const express = require('express');
const router = express.Router();
const userRouter = require('./user.routes');

router.use((req, res, next)=>{
    console.log(`public route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.use("/user", userRouter);

module.exports=router;