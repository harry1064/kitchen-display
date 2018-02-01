/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let ProductModel = require('../Models').ProductModel;
let express = require('express');
let router = express.Router();
let basePath = '/product';
let HandleApiError = require('../Utility/HandleApiError');
let sendEventToAllNamespaces = require('../Libs/SendEventToAllNamespaces').sendEventToAllNameSpaces;

// To get Products
router.get(basePath, async (req, res) => {
    try {
        let products = await ProductModel.getAllProducts();
        res.json({
            success: true,
            products: products,
            message: 'All products'
        })
    } catch (e) {
       HandleApiError(e, res);
    }
});

// To create product
router.post(basePath, async (req, res) => {
    try {
        let body = req.body;
        let product = await ProductModel.checkProductForName(body.name);
        if (product) {
            res.json({
                success: false,
                message: `Product with name ${body.name} already exist`
            });
            return;
        }
        product = await ProductModel.createProduct(body);
        if (router.io) {
            let products = await ProductModel.getAllProducts();
            sendEventToAllNamespaces(router.io, products)
        }
        res.json({
            success: false,
            product: product,
            message: 'Product created successfully'
        })
    } catch (e) {
        HandleApiError(e, res);
    }
});


module.exports = router;