import React, { Component } from 'react'

// UI
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

// CSS
import classes from './ContactData.css'

import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        orderForm: {
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
                    minLength: 5,
                    maxLength: 5
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
                validatation: {},
                valid:true
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        console.log(this.state.orderForm);
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/orders');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { 
            ...updateOrderForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputId in updateOrderForm) {
            formIsValid = updateOrderForm[inputId].valid && formIsValid;
        }
        this.setState({
            orderForm: updateOrderForm,
            formIsValid: formIsValid
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(form => (<Input 
                            key={form.id} 
                            elementType={form.config.elementType} 
                            elementConfig={form.config.elementConfig} 
                            value={form.config.value}
                            invalid={!form.config.valid}
                            shouldValidate={form.config.validation}
                            touched={form.config.touched}
                            changed={(e) => this.inputChangedHandler(e, form.id)} />
                        )
                    )
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Data </h4>
                { form }
            </div>
        )
    }
}

export default ContactData;
