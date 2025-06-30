const passport = require('passport');
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body);
    review.author = req.user._id;
    campground.reviews.push(review);

    await review.save();
    await campground.save();
    req.flash('success', 'New review created!');
    res.redirect(`/campgrounds/${campground._id}`);

};

module.exports.deleteReview = async (req, res, next) => {
    const { id1, id2 } = req.params;
    const campground = await Campground.findByIdAndUpdate(id1, { $pull: { reviews: id2 } });
    await Review.findByIdAndDelete(id2);
    req.flash('success', 'Successfully deleted review!');

    res.redirect(`/campgrounds/${campground._id}`);
};