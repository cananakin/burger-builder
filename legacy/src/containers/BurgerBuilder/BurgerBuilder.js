import React, { Component } from 'react'
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'
import * as typeActions from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon:0.7,
    cheese: 0.4,
    meat:1.3
}

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            //ingredients: null,
            //totalPrice: 4,
            purchasable: false,
            purchasing:false,
            loading: false,
            error: false
        }
    }

    componentDidMount () {
        // axios.get('/ingredients.json')
        //     .then(response => this.setState({ingredients: response.data}))
        //     .catch(error => this.setState({ error: true }))
    }

     updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0)
            return alert('Count is 0')
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice.toFixed(2)
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const { ingredients } = this.props
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]))
        }
        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = null;        
        
        let burger = this.state.error ? <p>We can't be loaded! </p> : <Spinner />
        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice} 
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseContinued={this.purchaseContinueHandler} 
                purchaseCancelled={this.purchaseCancelHandler} /> 
            
            if(this.state.loading){
                orderSummary = <Spinner />
            }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                { burger }
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type:typeActions.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type:typeActions.REMOVE_INGREDIENT, ingredientName: ingName }) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
