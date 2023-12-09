const db = require('../database/db')
const sql = require('./sql_queries')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

function generate_access_token(id, role) {
    const payload = {id, role}
    return jwt.sign(payload, secret, {expiresIn: '24H'})
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {name, phone_number, password} = req.body
            const candidate = await db.query(sql.get_user(), [phone_number])
            if (candidate.rows.length) {
                return res.status(400).json({message: "Пользователь с таким номером телефона уже существует"})
            }
            const hash_pass = bcrypt.hashSync(password, 7)
            await db.query(sql.create_user(), [name, phone_number, hash_pass])
            return res.json("Пользователь зарегистрирован!")

        }
        catch(e) {
            console.log(e)
            res.status(500).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {phone_number, password} = req.body
            let user = await db.query(sql.get_user(), [phone_number])
            if (!user.rows.length) {
                return res.status(400).json({message: "Пользователя с таким номером не существует"})
            }
            user = user.rows[0]
            const valid_pass = bcrypt.compareSync(password, user.hash_pass)
            if (!valid_pass) {
                return res.status(400).json({message: "Неверный пароль"})
            }
            const token = generate_access_token(user.id, user.role_id)
            res.cookie('auth', token, {maxAge:86400000, httpOnly:true})
            return res.json({message: "Успешно!"})

        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: "Login error"})
        }
    }

    async logout(req, res) {
        try {
            res.cookie('auth', '', {maxAge:0, httpOnly:true})
            res.json({message: 'Успешно!'})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: "Logout error"})
        }
    }
}

module.exports = new AuthController()