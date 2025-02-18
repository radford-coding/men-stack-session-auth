const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const port = process.env.PORT ? process.env.PORT : '3000';

const authController = require('./controllers/auth');
// const User = require('./models/user');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// ROUTERS - authentication routes are handled in a separate file
app.use('/auth', authController);

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log(`the express app is ready on port ${port}!`);
});