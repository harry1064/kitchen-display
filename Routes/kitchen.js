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
        if (store) {
            res.render('index', {
                store: store
            })
        } else {
            res.render('notfound')
        }
    } catch (e) {
        res.render('notfound')
    }
});

module.exports = router;