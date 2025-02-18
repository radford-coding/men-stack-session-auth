const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    // usernames must be unique
    const userUsed = await User.findOne({ username: req.body.username });
    if (userUsed) {
        return res.send('username already taken.');
    };
    // passwords must match
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('passwords must match.');
    };
    // passwords can't be stored as plain text
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.send(`thanks for signing up, ${user.username}`);
});

module.exports = router;