import React from 'react'
import classes from './Input.css'

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
    }

    switch (props.elementType){
        case 'input':
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />
            break;
        case 'textarea': 
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig}
                onChange={props.changed}>
                    {props.value}
                </textarea>
            break;
        case 'select': 
            inputElement = <select 
                className={classes.InputElement} 
                value={props.value}
                {...props.elementConfig}
                onChange={props.changed}>
                { props.elementConfig.options.map(opt => (
                    <option 
                        key={opt.value}
                        value={opt.value} >
                            {opt.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value} />
            break;
    }
    return (
       <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
            {validationError}
       </div>
    )
}

export default Input
