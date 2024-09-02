import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    slug: String,
    short_description: String,
    price: Number,
    until: String,
    sku: String,
    stock: Number,
    ratings: Number,
    reviews: Number,
    sale_count: Number,
    is_hot: Boolean,
    is_new: Boolean,
    is_sale: Boolean,
    is_out_of_stock: Boolean,
    release_date: String,
    developer: String,
    publisher: String,
    game_mode: String,
    rated: Number,
    small_pictures: [{
        width: Number,
        height: Number,
        url: String,
    }],
    pictures: [{
        width: Number,
        height: Number,
        url: String,
    }],
    large_pictures: [{
        width: Number,
        height: Number,
        url: String,
    }],
    brands: [{
        id: Number,
        name: String,
        slug: String,
    }],
    tags: [{
        id: Number,
        name: String,
        slug: String,
    }],
    categories: [{
        id: Number,
        name: String,
        slug: String,
        parent: String,
    }],
    variants: [{
        price: Number,
        sale_price: Number,
        size: {
            name: String,
            size: String,
            thumb: {
                width: Number,
                height: Number,
                url: String,
            },
        },
        color: {
            name: String,
            color: String,
            thumb: {
                width: Number,
                height: Number,
                url: String,
            },
        },
    }],
}, { timestamps: true })

const Product = mongoose.model('Product' , ProductSchema)
export default Product