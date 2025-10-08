import { useDispatch } from 'react-redux';
import classes from './BuildControl.module.css'
import { addIngredient, removeIngredient } from '../../../../store/slice';
import type { AppDispatch } from '../../../../store';

type BuildControlProps = {
    label: 'Bacon' | 'Cheese' | 'Meat' | 'Salad' ;
    type: 'bacon' | 'cheese' | 'meat' | 'salad' ;
    disabled: boolean;
};

const BuildControl = ({ label, disabled, type}: BuildControlProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button 
                className={classes.Less} 
                onClick={() => dispatch(removeIngredient(type))}
                disabled={disabled}>
                Less
            </button>
            <button className={classes.More} onClick={() => dispatch(addIngredient(type))}>More</button>
        </div>
    )

}
export default BuildControl