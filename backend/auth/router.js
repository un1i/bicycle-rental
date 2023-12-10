const express = require('express');
const router = express.Router();
const auth_ctr = require('./controller')
const {check} = require('express-validator')

router.post('/registration',
    [
        check('name', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть от 5 до 80 символов").isLength({min:5, max:80}),
        check('phone_number', 'Недействительный номер телефона\nНомер должен состоять только из 11 цифр и начинаться с +7, 7 или 8').isMobilePhone('ru-RU')
    ],
    auth_ctr.registration)

router.post('/login', auth_ctr.login)
router.get('/logout', auth_ctr.logout)

module.exports = router;