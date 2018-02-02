/**
 * Created by quintotechnologiespvtltd on 02/02/18.
 */

import React from 'react'

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: 0
        }
    }

    _nameInputChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    _quantityChange(e) {
        if (e.target.value > 0) {
            this.setState({
                price: e.target.value
            })
        }
    }

    async _addProductClicked(e) {
        this.props.appStateController.updateLoaderStatus(true);
        try {
            this.validateProduct();
            let response = await this.props.appStateController.addProduct(this.state);
            if (response.success) {
                this.setState({
                    name: '',
                    price: 0
                })
            }
            alert(response.message)
        } catch (exception) {
            alert(exception.message)
        }
        this.props.appStateController.updateLoaderStatus(false);
    }

    validateProduct() {
        if (this.state.name.replace(' ', '').length === 0) {
            throw new Error("Name cannot be empty.")
        }
        if (this.state.price === 0) {
            throw  new  Error("Price cannot be zero.")
        }
    }

    render() {
        return (
            <div className="col-md-6">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input value={this.state.name}
                                   onChange={this._nameInputChange.bind(this)}/></td>
                        <td><input type="number" value={this.state.price}
                                   onChange={this._quantityChange.bind(this)}/>
                        </td>
                        <td>
                            <button type="button"
                                    onClick={this._addProductClicked.bind(this)}>
                                Add
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>)
    }
}

module.exports = AddProduct;