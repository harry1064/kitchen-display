/**
 * Created by quintotechnologiespvtltd on 24/01/18.
 */
let models = require('../Models');
let StoreModel = models.StoreModel;
let HandleApiError = require('../Utility/HandleApiError');

module.exports = async function (req, res, next) {
    try {
        let body = req.body;
        let storeId = body.storeId ? body.storeId: req.params.storeId;
        let store = await StoreModel.getStore(storeId);
        if (!store) {
            res.json({
                success: false,
                message: `Store with id ${storeId} does not exist.`
            });
        } else {
            req.store = store;
            next()
        }
    } catch (e) {
        HandleApiError(e, res);
    }
};
