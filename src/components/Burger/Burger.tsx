//import { withRouter } from 'react-router-dom'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'
import type { BurgerState, IngredientName } from '../../store/slice'
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const Burger: React.FC = () => {
    const ingredients = useSelector<RootState, BurgerState['ingredients']>(state => state.burger.ingredients);
    const names = Object.keys(ingredients) as IngredientName[];
    
    let transformedIngredient = names.map(igKey => {
            return [...Array(ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    
    let content: React.ReactNode = transformedIngredient.length
    ? transformedIngredient
    : <p>Please Start Adding ingredients</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {content}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default (Burger);
