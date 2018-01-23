/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let express = require('express');
let router = express.Router();
let basePath = '/order';
let HandleApiError = require('../Utility/HandleApiError');
let models = require('../Models');
let OrderModel = models.OrderModel;
let ProductLogModel = models.ProductLogModel;
let middlewares = require('../Middlewares');
let sendEventToSocketNameSpace = require('../Libs/SendEventToNameSpace').sendEventToNameSpace;
/*
* To get all orders
* */
router.get(basePath, async (req, res) => {
    try {
        let orders = await OrderModel.getAllOrders();
        res.json({
            success: true,
            message: 'All orders',
            orders: orders
        })
    } catch (e) {
        HandleApiError(e, res)
    }
});

/*
* To create new order
* */
router.post(basePath, middlewares.storeCheck, middlewares.productCheck, async (req, res) => {
    try {
        let body = req.body;
        let storeId = body.storeId;
        let productId = body.productId;
        let quantity = body.quantity;
        let order = await OrderModel.createOrder({
            store: storeId,
            product: productId,
            quantity: quantity
        });

        let productLog = await ProductLogModel.getProductLog(storeId, productId);
        if (productLog) {
            let newQuantity = productLog.quantity + quantity;
            productLog = await ProductLogModel.updateProductLog(storeId, productId, {
                quantity: newQuantity
            })
        } else {
           productLog = await ProductLogModel.createProductLog({
               store: storeId,
               product: productId,
               quantity: quantity,
               produced: 0,
               prediction: 0
           })
        }
        // here socket event
        if (router.io) {
            sendEventToSocketNameSpace(router.io, productLog.store);
        }
        res.json({
            success: true,
            message: 'Order created successfully',
            order: order
        })
    } catch (e) {
        HandleApiError(e, res)
    }
});

module.exports = router;