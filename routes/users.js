const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const { register, createUser, login, authenticate, logout } = require('../controllers/users');

router.route('/register')
    .get(register)
    .post(catchAsync(createUser));

router.route('/login')
    .get(login)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), authenticate);

router.get('/logout', logout);
module.exports = router;