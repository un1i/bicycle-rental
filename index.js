const express = require('express');
const app = express();
const path = require('path')
const bicycle = require('./bicycle/router');
const rental_point = require('./rental_point/router')
const user = require('./user/router')
const trip = require('./trip/router')
const auth = require('./auth/router')
const PORT = 80

app.use(express.json())
app.use('/bicycles', bicycle);
app.use('/rental-points', rental_point)
app.use('/trip', trip)
app.use('/auth', auth)
app.use('/user', user)
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))
app.use('/images', express.static(path.resolve(__dirname, 'bicycle', 'images')))
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'))
})
app.listen(PORT);
