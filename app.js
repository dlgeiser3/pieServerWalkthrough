require('dotenv').config();
const express = require('express');
const app = express();
const pies = require('./controllers/piecontroller');
const user = require('./controllers/usercontroller');

const sequelize = require('./db');


sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/pies', pies);
app.use('/auth', user);

// app.get('/pies', (req, res) => res.send('I love pie!'));

app.listen(process.env.PORT, () => console.log(`app is listening on port ${process.env.PORT}`));