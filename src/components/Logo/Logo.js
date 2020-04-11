import React from 'react'
import logoImage from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logoImage} alt="Burger"/>
        </div>
    )
}

export default Logo
