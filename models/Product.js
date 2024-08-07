// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    cakeName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    details: {
        price: {
            type: Number,
            required: true
        },
        description: {
            type: [String],
            required: true
        }
    }
});

module.exports = mongoose.model('Product', productSchema);
