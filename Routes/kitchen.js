/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
let express = require("express");
let router = express.Router();
let StoreModel = require('../Models').StoreModel;

router.get('/:storeId', async (req, res) => {
    let store;
    try {
        store = await StoreModel.getStore(req.params.storeId);
        res.render('index', {
            store: store
        })
    } catch (e) {
        res.render('notfound')
    }
});

module.exports = router;