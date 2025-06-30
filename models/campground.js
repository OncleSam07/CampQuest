const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})
const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, opts);
CampgroundSchema.virtual('properties.popUpText').get(function () {
    return `<strong><a href="/campgrounds/${this._id}" style="text-decoration: none;">${this.title}</a></strong><br>
    <p style="color: black;">${this.description.substring(0,78)}...</p>`;
});
//setting our query middleware

CampgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground) {
        await Review.deleteMany({ _id: { $in: campground.reviews } });
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);