const express = require('express');
const router = express.Router();
const auth_ctr = require('./controller')
const {check} = require('express-validator')

router.post('/registration',
    [
        check('name', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть от 5 до 80 символов").isLength({min:5, max:80})
    ],
    auth_ctr.registration)

router.post('/login', auth_ctr.login)
router.get('/logout', auth_ctr.logout)

module.exports = router;