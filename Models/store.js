/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CustomError = require('../Utility/CustomError');

let storeSchema = new Schema({
    name: {type: String, required: true},
    locality: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
});


storeSchema.statics.getAllStores = function () {
    let model = this;
    return new Promise((resolve, reject) => {
        model.find({}, (err, stores) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(stores)
            }
        })
    })
};

storeSchema.statics.getStore = function (storeId) {
    let model = this;
    return new Promise((resolve, reject) => {
        model.findOne({_id: storeId}, (err, stores) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(stores)
            }
        })
    })
};



storeSchema.statics.createStore = function (storeData) {
    const model = this;
    return new Promise((resolve, reject) => {
        let newStore = new model(storeData);
        newStore.save((err, store) => {
            if (err) {
                reject(new CustomError(err.message))
            } else {
                resolve(store)
            }
        })
    })
};




module.exports = mongoose.model('Store', storeSchema);