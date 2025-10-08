
import { useEffect, useState } from 'react';
import { type BurgerState, type IngredientName } from '../../../store/slice';
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.css'
import type { RootState } from '../../../store';
import { useSelector } from 'react-redux';

type Control = { 
    label: 'Salad' | 'Bacon' | 'Cheese' | 'Meat',
    type: IngredientName };

const controls: ReadonlyArray<Control> = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

type BuildControlsProps = {
    price: number;
    disabled: Record<IngredientName, boolean>;
    ordered: () => void;
};

const BuildControls = ({ price, disabled, ordered }: BuildControlsProps) => {
    const [purchasable, setPurchasable] = useState<boolean>(false);
    const totalPrice = useSelector<RootState, BurgerState['totalPrice']>(state => state.burger.totalPrice);

    useEffect(() => {
        if(totalPrice > 0) {
            updatePurchaseState(totalPrice);
        }
    }, [totalPrice])

    
    const updatePurchaseState = (total: number) => {
        setPurchasable(total > 4 );
    }


    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong> </p>
            {controls.map((ctrl) => (
                <BuildControl 
                    key={ctrl.label} 
                    type={ctrl.type}
                    label={ctrl.label} 
                    disabled={disabled[ctrl.type]} />
            ))}
            <button 
                className={classes.OrderButton} 
                disabled={!purchasable}
                onClick={ordered}
                >ORDER NOW</button>
        </div>
    )
}

export default BuildControls