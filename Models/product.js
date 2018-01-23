/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let CustomError = require('../Utility/CustomError');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
});

productSchema.statics.getProduct = function (productId) {
    const model = this;
    return new Promise((resolve, reject) => {
        model.findOne({_id: productId}, (err, product) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(product)
            }
        })
    })
};

productSchema.statics.getAllProducts = function () {
    let model = this;
    return new Promise((resolve, reject) => {
        model.find({}, (err, products) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(products)
            }
        })
    })
};

productSchema.statics.createProduct = function (productData) {
    let model = this;
    return new Promise((resolve, reject) => {
        let newProduct = new model(productData);
        newProduct.save((err, product) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(product)
            }
        })
    })
};

module.exports = mongoose.model('Product', productSchema);