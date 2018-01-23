/**
 * Created by quintotechnologiespvtltd on 24/01/18.
 */
let models = require('../Models');
let ProductModel = models.ProductModel;
let HandleApiError = require('../Utility/HandleApiError');

module.exports = async function (req, res, next) {
    try {
        let body = req.body;
        let productId = body.productId;
        let product = await ProductModel.getProduct(productId);
        if (!product) {
            res.json({
                success: false,
                message: `Product with id ${productId} does not exist.`
            });
        } else {
            next()
        }
    } catch(e) {
        HandleApiError(e, res);
    }

};