/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
const mongoose = require('mongoose');
require('./order');
require('./product');
require('./store');
require('./ProductLog');

const OrderModel = mongoose.model('Order');
const ProductModel = mongoose.model('Product');
const StoreModel = mongoose.model('Store');
const ProductLogModel = mongoose.model('ProductLog');

module.exports =  {
    OrderModel,
    ProductModel,
    StoreModel,
    ProductLogModel
}