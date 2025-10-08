import { useSelector } from 'react-redux';
import type { BurgerState, IngredientName } from '../../../store/slice';
import type { RootState } from "../../../store";
import Button from '../../UI/Button/Button';

type BuildControlsProps = {
    //ingredients: BurgerState['ingredients'];
    //price: number;
    purchaseContinued: () => void;
    purchaseCancelled: () => void;
};

const OrderSummary = ({ purchaseCancelled, purchaseContinued }:BuildControlsProps) => {
    
    const ingredients = useSelector<RootState, BurgerState['ingredients']>(state => state.burger.ingredients);
    const price = useSelector<RootState, BurgerState['totalPrice']>(state => state.burger.totalPrice);
    
    const names = Object.keys(ingredients) as IngredientName[];
    const ingredientSummary = names.map(igKey => {
            return <li key={igKey}> <span style={{textDecoration:'capitalize'}}>{igKey}:</span> {ingredients[igKey]}</li>
        });

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={purchaseContinued}>CONTINUE</Button>
        </>
    )

}

export default OrderSummary
