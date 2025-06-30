const passport = require('passport');
const User = require('../models/user');

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next(err);

            req.flash('success', `Welcome to YelpCamp ${user.username}  `);
            res.redirect('/campgrounds');

        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.login = (req, res) => {
    res.render('users/login');
};

module.exports.authenticate = async (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!  `);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', `Goodbye!  `);
        res.redirect('/campgrounds');
    });
};