import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './ChechoutSummary.module.css'

type BurgerProps = {
    checkoutCancelled: () => void;
    checkoutContinued: () => void;
};

const ChechoutSummary = ({ checkoutCancelled, checkoutContinued }:BurgerProps) => {
    
    return (
        <div className={classes.ChechoutSummary}>
            <h1>I hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger /> 
            </div>
            <Button 
                btnType="Danger" 
                clicked={checkoutCancelled}>
                    CANCEL
            </Button>
            <Button 
                btnType="Success" 
                clicked={checkoutContinued}>
                    SUCCESS
            </Button>
        </div>
    )
}

export default ChechoutSummary;
