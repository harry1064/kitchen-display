/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */

module.exports = function (error, res) {
    if (error.type === 'Custom') {
        res.json(error.toErrorResponse())
    } else {
        res.json({
            status: false,
            message: 'Something went wrong on our side.'
        })
    }
};