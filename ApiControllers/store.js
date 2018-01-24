/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let express = require('express');
let router = express.Router();
let basePath = '/store';
let HandleApiError = require('../Utility/HandleApiError');
let ProductLogModel = require('../Models').ProductLogModel;
let StoreModel = require('../Models').StoreModel;
let middlewares = require('../Middlewares');
let createNameSpaceForStore = require('../Libs/CreateNameSpace').createNameSpaceForStore;
let sendEventToSocketNameSpace = require('../Libs/SendEventToNameSpace').sendEventToNameSpace;
/*
 * To get all store
 * */
router.get(basePath, async (req, res) => {
    try {
        let stores = await StoreModel.getAllStores();
        res.json({
            success: true,
            message: 'All stores',
            stores: stores
        })
    } catch (e) {
        HandleApiError(e, res)
    }
});

/*
 * To create new store
 * */
router.post(basePath, async (req, res) => {
    try {
        let body = req.body;
        let store = await StoreModel.createStore(body);
        if (router.io) {
            createNameSpaceForStore(router.io, store);
            console.log(`Socket name space created for storeId ${store._id}`)
        }
        res.json({
            success: true,
            message: 'Store created successfully',
            store: store
        })
    } catch (e) {
        HandleApiError(e, res)
    }
});

/*
 * To set prediction values of product for particular store
 *
 * */
router.post(`${basePath}/product/prediction`, middlewares.storeCheck, middlewares.productCheck, async (req, res) => {
    try {
        /*
         * Missing validation for request parameter
         * */
        let storeId = req.body.storeId;
        let productId = req.body.productId;
        let prediction = req.body.prediction;
        let productLog = await ProductLogModel.getProductLog(storeId, productId);
        if (productLog) {
            productLog = await ProductLogModel.updateProductLog(storeId, productId, {
                produced: 0,
                prediction: prediction,
                quantity: 0
            })
        } else {
            productLog = await ProductLogModel.createProductLog({
                store: storeId,
                product: productId,
                prediction: prediction,
                produced: 0,
                quantity: 0
            })
        }
        res.json({
            success: true,
            message: 'Predicted value set successfully'
        })
    } catch (e) {
        HandleApiError(e, res)
    }
});

/*
 * To be called when clicked done of product for particular store
 *
 * */
router.post(`${basePath}/product/done`,middlewares.storeCheck, middlewares.productCheck, async (req, res) => {
    try {
        /*
         * Missing validation for request parameter
         * */
        let storeId = req.body.storeId;
        let productId = req.body.productId;
        let productLog = await ProductLogModel.getProductLog(storeId, productId);
        if (productLog) {
            let quantity = productLog.quantity;
            let newProducedVal = productLog.produced + quantity;
            productLog = await ProductLogModel.updateProductLog(storeId, productId, {
                produced: newProducedVal,
                quantity: 0
            })
        } else {
            res.json({
                success: false,
                message: 'Operation not allowed as it is invalid request.'
            });
            return;
        }
        res.json({
            success: true,
            message: 'ProductLog updated successfully.'
        });
        if (router.io) {
            sendEventToSocketNameSpace(router.io, productLog.store);
        }
    } catch (e) {
        HandleApiError(e, res)
    }
});
/*
* Route to download report
* */
router.get(`${basePath}/report/:storeId`,middlewares.storeCheck, async (req, res) => {
    try {
        let productLogs = await ProductLogModel.getDataForKitchenDisplay(req.store._id);
        let report = productLogs.reduce((accumulatedtext, productLog) => {
            return accumulatedtext = accumulatedtext + `${productLog.productName}\t${productLog.produced}\t${productLog.prediction}\n`
        }, 'Dish Name\tProduced\tPredicted\n');
        res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=report.tsv'});
        res.end(report)
    } catch (e) {
        HandleApiError(e, res)
    }
});


module.exports = router;
