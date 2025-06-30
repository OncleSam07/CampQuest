const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { index, newCamp, createCamp, showCamp, editCamp, updateCamp, deleteCamp } = require('../controllers/campgrounds');
const passport = require('passport');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCamp));


router.get('/new', isLoggedIn, newCamp);
router.route('/:id')
    .get(catchAsync(showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(deleteCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(editCamp));

module.exports = router; // always export the router after...