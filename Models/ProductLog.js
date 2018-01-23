/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let CustomError = require('../Utility/CustomError');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let productLogSchema = new Schema({
    store: {type: Schema.Types.ObjectId, required: true},
    product: {type: Schema.Types.ObjectId, required: true},
    prediction: {type: Number, required: true},
    produced: {type: Number, default: 0},
    quantity: {type: Number, default: 0}
});

productLogSchema.statics.getProductLog = function (storeId, productId) {
    const model = this;
    return new Promise((resolve, reject) => {
        model.findOne({
            store: storeId,
            product: productId
        }, (err, productLog) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(productLog)
            }
        })
    })
};

productLogSchema.statics.createProductLog = function (productLogData) {
    const model = this;
    return new Promise((resolve, reject) => {
        let newProductLog = new model(productLogData);
        newProductLog.save((err, productLog) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(productLog)
            }
        })
    })
};

productLogSchema.statics.updateProductLog = function (storeId, productId, updateObject) {
    const model = this;
    return new Promise((resolve, reject) => {
        model.findOneAndUpdate({store: storeId, product: productId},
            {$set: updateObject}, {new: true},
            (err, productLog) => {
                if (err) {
                    reject(new CustomError(err.message))
                } else {
                    resolve(productLog)
                }
            })
    })
};

productLogSchema.statics.getDataForKitchenDisplay = function (storeId) {
    const model = this;
    return new Promise((resolve, reject) => {
        model.aggregate([
            {
                $match:
                    {
                        store: storeId,
                    }
            },
            {
                $lookup:
                    {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product"
                    }
            },
            {
                $project: {
                    productId: "$product._id",
                    productName: "$product.name",
                    quantity: 1,
                    produced: 1,
                    prediction: 1,
                }
            }
        ], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};


module.exports = mongoose.model('ProductLog', productLogSchema);