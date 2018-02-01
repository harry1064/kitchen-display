/**
 * Created by quintotechnologiespvtltd on 02/02/18.
 */
import React from 'react'

class Prediction extends React.Component {
    constructor(props) {
        super(props);
    }

    _quantityChange(productId, e) {
        if (e.target.value >= 0) {
            let productLogs = this.props.appStateController.getProductLogs();

            if (productLogs[productId]) {
                productLogs[productId].prediction = e.target.value;
            } else {
                productLogs[productId] = {
                    prediction: e.target.value
                }
            }

            this.props.appStateController.setProductLogs(productLogs)
        }
    }

    async _setPredictionButtonClicked(productId, e) {
        this.props.appStateController.updateLoaderStatus(true);
        try {
            this._validatePredictionData(productId);
            let productLogs = this.props.appStateController.getProductLogs();
            let predictionData = {
                productId: productId,
                prediction: productLogs[productId].prediction
            };
            let response = await this.props.appStateController.setPrediction(predictionData);
            alert(response.message)
        } catch (exception) {
            alert(exception.message)
        }
        this.props.appStateController.updateLoaderStatus(false);
    }

    _validatePredictionData(productId) {
        let productLogs = this.props.appStateController.getProductLogs();
        if (!productLogs[productId]) {
            throw new Error("Prediction value should be greater than zero.")
        }
    }

    _getRows() {
        let productLogs = this.props.appStateController.getProductLogs();
        if (!productLogs) {
            return []
        }
        return this.props.appStateController.getProducts().map((product) => {
            let productId = product._id;
            let prediction = 0;
            if (productLogs[productId]) {
                prediction = productLogs[productId].prediction;
            }
            return (
                <tr key={productId}>
                    <td>{product.name}</td>
                    <td><input type="number" value={prediction}
                               onChange={this._quantityChange.bind(this, productId)}/>
                    </td>
                    <td>
                        <button type="button" onClick={this._setPredictionButtonClicked.bind(this, productId)}>
                            Set Prediction
                        </button>
                    </td>
                </tr>)
        })
    }

    render() {
        return (
            <div className="col-md-6">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Prediction</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this._getRows()}
                    </tbody>
                </table>
            </div>)
    }
}

module.exports = Prediction;