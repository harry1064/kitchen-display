/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
const ProductLogModel = require('../Models').ProductLogModel;

module.exports.sendEventToNameSpace = async function (io, storeId) {
    const nameSpaceString = '/' + storeId;
    if (io.nsps[nameSpaceString]) {
        let nsp = io.nsps[nameSpaceString];
        let data = await ProductLogModel.getDataForKitchenDisplay(storeId);
        nsp.emit('product-log-data', data)
    }
};