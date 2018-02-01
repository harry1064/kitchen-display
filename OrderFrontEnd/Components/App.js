/**
 * Created by quintotechnologiespvtltd on 01/02/18.
 */
import React from 'react';
import AppStateController from '../Controller/AppStateController';
import LoadingSpinner from './loader'
import Order from './Order'
import AddProduct from './AddProduct'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: path,
            store: store,
            products: products,
            order: {},
            showLoader: false
        };
        this.controller = new AppStateController(this);
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <LoadingSpinner showLoader={this.state.showLoader}/>
                    <div className="col-md-3">
                    </div>
                    {this.state.path.toLowerCase() === 'order' && <Order appStateController={this.controller}/>}
                    {this.state.path.toLowerCase() === 'product' && <AddProduct appStateController={this.controller}/>}
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

module.exports = App;