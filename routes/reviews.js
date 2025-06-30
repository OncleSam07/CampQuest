const express = require('express');
const router = express.Router();
const { createReview, deleteReview } = require('../controllers/reviews');
const catchAsync = require('../utilities/catchAsync');
const { reviewValidator, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/:id/reviews', isLoggedIn, reviewValidator, catchAsync(createReview));
router.delete('/:id1/reviews/:id2', isLoggedIn, isReviewAuthor, catchAsync(deleteReview));

module.exports = router;