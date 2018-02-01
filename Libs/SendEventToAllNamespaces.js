/**
 * Created by quintotechnologiespvtltd on 02/02/18.
 */
module.exports.sendEventToAllNameSpaces = async function (io, data) {

    Object.keys(io.nsps).forEach((nameSpaceString) => {
        let nsp = io.nsps[nameSpaceString];
        nsp.emit('products', data)
    });
};