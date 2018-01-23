/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
const ProductLogModel = require('../Models').ProductLogModel;

module.exports.createNameSpaceForStore = function (io, store) {
    const storeId = store._id;
    const nameSpaceString = '/' + storeId;
    if (io.nsps[nameSpaceString]) {
        // updating nsp
        let nsp = io.nsps[nameSpaceString];
        nsp.store = store;
        return
    }
    let ioChat = io.of(nameSpaceString);
    ioChat.store = store;
    //socket.io magic starts here
    ioChat.on('connection', async function (socket) {
        console.log('socket connected')
        let data = await ProductLogModel.getDataForKitchenDisplay(ioChat.store._id);
        socket.emit('product-log-data', data);
    })
};