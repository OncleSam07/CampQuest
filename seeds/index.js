const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '682b83e2a0f029d49d38500d',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dr55hkccb/image/upload/v1749549049/YelpCamp/lgoznsxwr5ool3xnivgh.jpg',
                    filename: 'YelpCamp/lgoznsxwr5ool3xnivgh',

                },
                {
                    url: 'https://res.cloudinary.com/dr55hkccb/image/upload/v1749549051/YelpCamp/aaekvooxnfkj7cbkycx0.webp',
                    filename: 'YelpCamp/aaekvooxnfkj7cbkycx0',

                },
                {
                    url: 'https://res.cloudinary.com/dr55hkccb/image/upload/v1749549051/YelpCamp/k1cua610b8k3eedtomoc.jpg',
                    filename: 'YelpCamp/k1cua610b8k3eedtomoc',

                }
            ],
            description: "Nestled in nature, this campground offers a peaceful escape with scenic views, fresh air, and open skies. Whether you're pitching a tent or parking your RV, it's the perfect spot to unwind, explore hiking trails, and enjoy the beauty of the outdoors.",
            price
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});