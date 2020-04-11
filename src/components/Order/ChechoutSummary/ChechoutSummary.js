import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './ChechoutSummary.css'

const ChechoutSummary = (props) => {
    return (
        <div className={classes.ChechoutSummary}>
            <h1>I hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} /> 
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.checkoutCancelled}>
                    CANCEL
            </Button>
            <Button 
                btnType="Success" 
                clicked={props.checkoutContinued}>
                    SUCCESS
            </Button>
        </div>
    )
}

export default ChechoutSummary;
