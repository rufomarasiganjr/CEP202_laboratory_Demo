const express = require('express');

const app = express();

const tempRoutes = require('./routes/api/temperature.js');

app.get('/', (req, res) => res.send('API Running, No Error'));
app.use(express.json({ extend: false }));
app.use('/temperature', tempRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
