const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

const app = express();
app.use(express.json());

const tempRoutes = require('./routes/api/temperature.js');
const authentication = require('./routes/api/auth.js');

app.get('/', (req, res) => res.send('API Running, No Error'));
app.use(express.json({ extend: false }));

app.use('/temperature', tempRoutes);
app.use('/auth', authentication);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
