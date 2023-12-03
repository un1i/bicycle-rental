const express = require('express');
const app = express();
const bicycle = require('./bicycle/router');
const rental_point = require('./rental_point/router')
const trip = require('./trip/router')
const auth = require('./auth/router')
const PORT = 80

app.use(express.json())
app.use('/bicycles', bicycle);
app.use('/rental-points', rental_point)
app.use('/trip', trip)
app.use('/auth', auth)

app.listen(PORT);
