
// UI
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

// CSS
import classes from './ContactData.module.css'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { RootState } from '../../../store'
import type { BurgerState } from '../../../store/slice'
import { useSelector } from 'react-redux'
import type { InputField, OrderForm, OrderPayload } from './FormTypes'

import axios from '../../../axios-orders'
import { useNavigate } from 'react-router-dom'


const ContactData = () => {
    const ingredients = useSelector<RootState, BurgerState['ingredients']>(state => state.burger.ingredients);
    const totalPrice = useSelector<RootState, BurgerState['totalPrice']>(state => state.burger.totalPrice);
    
    const navigate = useNavigate();

    const [orderForm, setOrderForm] = useState<OrderForm>({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: {
                required: "Please you don't empty field"
            }
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: {
                required: "Please you don't empty field"
            }
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 8
            },
            valid: false,
            touched: false,
            validationMessage: {
                required: "Please you don't empty field",
                minLength: "Please you should min 5 char",
                maxLength: "Please you should max 5 char",
            }
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: {
                required: "Please you don't empty field"
            }
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: {
                required: "Please you don't empty field"
            }
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: '', displayValue: 'Select Delivery Type'},
                    { value: 'fastest', displayValue: 'Fastest'},
                    { value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            valid:true,
            touched: false,
        }
    });
    const [loading, setLoading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    

    const orderHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const orderData = Object.fromEntries(
                (Object.keys(orderForm) as (keyof OrderForm)[]).map(k => [k, orderForm[k].value])
            ) as Record<keyof OrderForm, string>;
            
            const payload: OrderPayload = {
                ingredients: ingredients,
                price: totalPrice,
                orderData
            };

            await axios.post('/orders.json',payload);
            setLoading(false);
            navigate('/orders');
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
        
    }

    const inputChangedHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, key: keyof OrderForm) => {
        const value = e.target.value;

        setOrderForm(prev => {
            const field = prev[key];
            const nextField = {
                ...field,
                value,
                touched: true,
                valid: checkValidity(value, field.validation)
            } as OrderForm[typeof key];

            const nextForm = { ...prev, [key]: nextField } as OrderForm;

            // compute overall validity safely
            const nextIsValid = Object.values(nextForm).every(f => f.valid);
            setFormIsValid(nextIsValid);

            return nextForm;
        })
    }

    const checkValidity = (value: string, rules?: InputField['validation']): boolean => {
        if (!rules) return true;
        if (rules.required && value.trim() === '') return false;
        if (rules.minLength && value.length < rules.minLength) return false;
        if (rules.maxLength && value.length > rules.maxLength) return false;
        return true;
    }

    
    type FormElement = {
        id: keyof OrderForm;
        config: OrderForm[keyof OrderForm];
      };
      
      const formElementsArray: FormElement[] =
        (Object.keys(orderForm) as (keyof OrderForm)[])
          .map((key) => ({ id: key, config: orderForm[key] }));
      
    
    let form = (
        <form onSubmit={orderHandler}>
            {
            formElementsArray.map(({ id, config }) => {
                const base = {
                    key: id as string,
                    value: config.value,
                    invalid: !config.valid,
                    shouldValidate: !!config.validation && Object.keys(config.validation ?? {}).length > 0,
                    touched: config.touched,
                    changed: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                    inputChangedHandler(e, id),
                };

                switch (config.elementType) {
                    case 'input':
                    return (
                        <Input
                        {...base}
                        elementType="input"
                        elementConfig={config.elementConfig as React.InputHTMLAttributes<HTMLInputElement>}
                        />
                    );

                    case 'select':
                    return (
                        <Input
                        {...base}
                        elementType="select"
                        elementConfig={config.elementConfig as React.SelectHTMLAttributes<HTMLSelectElement> & {
                            options: { value: string; displayValue: string }[];
                        }}
                        />
                    );
                }
                })}
            <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if(loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4> Enter Your Contact Data </h4>
            { form }
        </div>
    )
}

export default ContactData;
