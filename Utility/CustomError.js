/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */

class CustomError extends Error {
    constructor(...args) {
        super(...args);
        this.type = 'Custom'
    }

    toErrorResponse() {
        return {
            success: false,
            message: this.message
        }
    }
}

module.exports = CustomError;