const express= require('express');
const router= express.Router();

const authController= require('../Controller/auth_controller');

router.post('./signup', authController.signup);
router.get('./signup', authController.signin);
router.get('./signup', authController.verify);
router.post('./signup', authController.article);


module.exports= router;