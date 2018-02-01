/**
 * Created by quintotechnologiespvtltd on 02/02/18.
 */
import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    async _OrderButtonClicked(e) {
        e.preventDefault();
        this.props.appStateController.updateLoaderStatus(true);
        try {
            this.validateOrder();
            let productsToAdd = Object.values(this.props.appStateController.getOrder());
            let data = await this.props.appStateController.callOrderApi(productsToAdd);
            this.props.appStateController.setOrder({});
            alert(data.message)
        } catch (e) {
            alert(e.message)
        }
        this.props.appStateController.updateLoaderStatus(false);

    }

    validateOrder() {
        let order = this.props.appStateController.getOrder();
        if (Object.values(order).length === 0) {
            throw new Error('Please select atleast one product to place order')
        }
    }

    _checkBoxClicked(productId, e) {
        e.preventDefault();
        let order = this.props.appStateController.getOrder();
        if (order[productId]) {
            delete order[productId]
        } else {
            order[productId] = {
                productId: productId,
                quantity: 1
            }
        }
        this.props.appStateController.setOrder(order);
    }

    _quantityChange(productId, e) {
        e.preventDefault();
        let order = this.props.appStateController.getOrder();

        if (order[productId] && e.target.value > 0) {
            order[productId].quantity = Number(e.target.value)
        }

        this.props.appStateController.setOrder(order);
    }

    _getTableRows() {
        return this.props.appStateController.getProducts().map((product) => {
            let order = this.props.appStateController.getOrder();
            let productId = product._id;
            let quantity = 0;
            let productSelected = false;
            if (order[productId]) {
                quantity = order[productId].quantity;
                productSelected = true
            }
            return (
                <tr key={productId}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><input type="number" value={quantity}
                               onChange={this._quantityChange.bind(this, productId)}/>
                    </td>
                    <td>
                        <button type="button"
                                onClick={this._checkBoxClicked.bind(this, productId)}>
                            {productSelected ? "REMOVE" : "ADD"}
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="col-md-6">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this._getTableRows()}
                    </tbody>
                </table>
                <button onClick={this._OrderButtonClicked.bind(this)}>Place
                    Order
                </button>
            </div>
        )
    }
}

module.exports = Order;