/**
 * Created by quintotechnologiespvtltd on 01/02/18.
 */
import io from 'socket.io-client'
class AppStateController {
    constructor(app) {
        this._app = app;
        this._createSocket();
    }

    _createSocket() {
        if (this._socket) {
            this._socket.disconnect()
        }
        this._socket = io.connect('/' + this.getStore()._id, {
            'reconnection': true,
            'reconnectionDelay': 10,
            'reconnectionAttempts': 100
        });
        this.registerEvent()
    }

    registerEvent() {
        const socket = this._socket;
        socket.on('connect', (() => {
            console.log('connected');
            this._app.setState({
                showLoader: false
            });
        }).bind(this));
        socket.on('product-log-data', ((data) => {
            console.log(data);
            this._app.setState({
                productLogs: data
            })
        }).bind(this));

        socket.on('products', ((data) => {
            console.log(data);
            this._app.setState({
                products: data
            })
        }).bind(this));

        socket.on("disconnect", (() => {
            this._app.setState({
                showLoader: true
            })
        }).bind(this))
    }

    getStore() {
        return this._app.state.store;
    }

    getOrder() {
        return this._app.state.order;
    }

    getProducts() {
        return this._app.state.products;
    }

    setOrder(order) {
        this._app.setState({
            order: order
        })
    }

    updateLoaderStatus(status) {
        this._app.setState({
            showLoader: status
        })
    }

    callOrderApi(products) {
        let data = {
            storeId: this.getStore()._id,
            products: products
        };
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/v1/order',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.success) {
                        resolve(data);
                    }
                    else {
                        reject(new Error(data.message || 'Something' +
                            ' went wrong. Please try again in a while.'))
                    }
                },
                error: function (err) {
                    reject(new Error('Something went wrong. Please try again' +
                        ' in a while.'))
                }
            });
        });
    }

    addProduct(productData) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/v1/product',
                type: 'post',
                dataType: 'json',
                data: productData,
                success: function (data) {
                    if (data.success) {
                        resolve(data);
                    }
                    else {
                        reject(new Error(data.message || 'Something' +
                            ' went wrong. Please try again in a while.'))
                    }
                },
                error: function (err) {
                    reject(new Error('Something went wrong. Please try again' +
                        ' in a while.'))
                }
            });
        });
    }
}

module.exports = AppStateController;