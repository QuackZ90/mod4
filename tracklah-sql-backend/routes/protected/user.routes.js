const express = require('express');
const router = express.Router();
const {userController} = require('../../controller');
const {validateAmendUser} = require('../../middleware/dataValidator');

router.use((req, res, next)=>{
    console.log(`user route called with url: ${req.url}, method: ${req.method}, body:`, req.body);
    next();
});

router.get('/:username', userController.getUserData);

router.patch('/:username', validateAmendUser, userController.patchUserData);

router.delete('/:username', userController.delete);

module.exports=router;