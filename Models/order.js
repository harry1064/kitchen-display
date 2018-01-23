/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let CustomError = require('../Utility/CustomError');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let orderSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type:Number, required: true},
    store: {type: Schema.Types.ObjectId, ref: 'Store'}
});

orderSchema.statics.getAllOrders = function () {
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

orderSchema.statics.createOrder = function (orderData) {
    let model = this;
    return new Promise((resolve, reject) => {
        let newOrder = new model(orderData);
        newOrder.save((err, order) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(order)
            }
        })
    })
};

module.exports = mongoose.model('Order', orderSchema);