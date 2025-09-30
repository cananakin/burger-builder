import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/ChechoutSummary/ChechoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 0
        }
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] =+ param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    ceheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if(this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.ceheckoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={() => <ContactData {...this.props} ingredients={this.state.ingredients} price={this.state.totalPrice}  />} />
                </div>
            );
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
