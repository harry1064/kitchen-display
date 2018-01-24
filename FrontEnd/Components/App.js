/**
 * Created by quintotechnologiespvtltd on 23/01/18.
 */
import React from 'react';
import AppStateController from '../Controller/AppStateController';
import LoadingSpinner from './loader'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: store,
            productLogs: [],
            showLoader: false
        };
        this.controller = new AppStateController(this);
    }

    async _doneButtonClicked(productId, e) {
        e.preventDefault();
        this.setState({
            showLoader: true
        });
        try {
            let data = await this.controller.callDoneApi(productId);
            alert(data.message)
        } catch (e) {
            alert(e.message)
        }
        this.setState({
            showLoader: false
        });

    }

    _getTableRows() {
        return this.state.productLogs.map((productLog) => {
            return (
                <tr key={productLog.productId}>
                    <td>{productLog.productName}</td>
                    <td>{productLog.quantity}</td>
                    <td>{productLog.produced}</td>
                    <td>{productLog.prediction}</td>
                    <td><a href="#" className="team-delete"
                           onClick={this._doneButtonClicked.bind(this, productLog.productId)}
                    >DONE</a></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <LoadingSpinner showLoader={this.state.showLoader}/>
                    <div className="col-md-3">
                        <a href={`/api/v1/store/report/${this.state.store._id}`} className="team-delete"
                        >Download Report</a>
                    </div>
                    <div className="col-md-6">
                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Created till now</th>
                                <th>Predicted</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this._getTableRows()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

module.exports = App;