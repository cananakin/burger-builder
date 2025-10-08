import type {
    ChangeEvent,
    InputHTMLAttributes,
    SelectHTMLAttributes,
    JSX,
  } from 'react';
  import classes from './Input.module.css';
  
  type Option = { value: string; displayValue: string };
 
  type BaseProps = {
    label?: string;
    invalid?: boolean;
    shouldValidate?: boolean;
    touched?: boolean;
    errorMessage?: string;
    value?: string;
    changed: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
};
  
type InputProps = BaseProps & {
    elementType: 'input';
    elementConfig?: InputHTMLAttributes<HTMLInputElement>;
};
  
type SelectProps = BaseProps & {
    elementType: 'select';
    elementConfig: SelectHTMLAttributes<HTMLSelectElement> & {
      options: Option[];
    };
};
  
type Props = InputProps | SelectProps;
  
export default function Input(props: Props): JSX.Element {
    let inputElement: JSX.Element;
    const inputClasses = [classes.InputElement];
  
    if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid);
    }
  
    let validationError: JSX.Element | null = null;
    if (props.invalid && props.touched && props.errorMessage) {
      validationError = (
        <p className={classes.ValidationError}>{props.errorMessage}</p>
      );
    }
  
    switch (props.elementType) {
      case 'input':
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...(props.elementConfig ?? {})}
            onChange={props.changed}
            value={props.value ?? ''}
          />
        );
        break;
  
      case 'select': {
        const { options, ...selectProps } = props.elementConfig;
        inputElement = (
          <select
            className={classes.InputElement}
            {...selectProps}
            value={props.value ?? ''}
            onChange={props.changed}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.displayValue}
              </option>
            ))}
          </select>
        );
        break;
      }
  
    }
  
    return (
      <div className={classes.Input}>
        {props.label && <label className={classes.Label}>{props.label}</label>}
        {inputElement}
        {validationError}
      </div>
    );
  }
  