import type { JSX } from 'react';
import type { BurgerState, IngredientName } from '../../store/slice';
import classes from './Order.module.css';

type BurgerProps = {
    ingredients: BurgerState['ingredients'];
    price: number;
};

const Order = ({ ingredients, price}: BurgerProps) => {
    
    const ingredient: JSX.Element = (
        <>
          {(Object.entries(ingredients) as [IngredientName, number][])
            .map(([name, amount]) => (
              <span key={name}>{name} {amount}</span>
            ))}
        </>
      );

    // const ingredient = newIngredients.map(ing => {
    //     return <span key={ing.name}> {ing.name} ({ing.amount})</span>
    // })
    return (
        <div className={classes.Order}>
            <p> Ingredient : {ingredient} </p>
            <p> Price : <strong>£{price}</strong> </p>
        </div>
    )
    
}

export default Order
