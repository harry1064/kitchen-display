/**
 * Created by quintotechnologiespvtltd on 01/02/18.
 */
let express = require("express");
let router = express.Router();
let models = require('../Models');
let StoreModel = models.StoreModel;
let ProductModel = models.ProductModel;

router.get('/:storeId/order', async (req, res) => {
    let store;
    try {
        store = await StoreModel.getStore(req.params.storeId);
        let products = await ProductModel.getAllProducts();
        if (store) {
            res.render('order', {
                path: 'order',
                store: store,
                products: products
            })
        } else {
            res.render('notfound')
        }
    } catch (e) {
        res.render('notfound')
    }
});

module.exports = router;