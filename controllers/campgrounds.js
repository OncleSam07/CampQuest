const passport = require('passport');
const moment = require('moment');
const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
};

module.exports.newCamp = (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createCamp = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    const campground = new Campground(req.body);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.geometry = geoData.body.features[0].geometry;
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully created a new campground!  ');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCamp = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found!  ');
        return res.redirect('/campgrounds');
    }
    //Update for time precision
    const timeAgo = moment(campground.createdAt).fromNow();
    res.render('campgrounds/show', { campground, timeAgo })
};

module.exports.editCamp = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found!  ');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground })
};

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const urls = req.files.map(f => ({ url: f.path, filename: f.filename }));
    const campground = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true });
    campground.images.push(...urls);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        console.log(campground);
    }
    req.flash('success', 'Successfully updated campground!  ');
    res.redirect(`/campgrounds/${campground._id}`)
};

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted campground!  ');
    res.redirect('/campgrounds');
};