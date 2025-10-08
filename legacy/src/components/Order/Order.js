import React from 'react'
import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    for (let i in props.ingredients) {
        //ingredient.push( ingredientsName[i] + ' (' + props.ingredients[i] + ')' );
        ingredients.push({ name: i, amount: props.ingredients[i] })
    }
    const ingredient = ingredients.map(ing => {
        return <span key={ing.name}> {ing.name} ({ing.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p> Ingredient : {ingredient} </p>
            <p> Price : <strong>£{props.price}</strong> </p>
        </div>
    )
    
}

export default Order
