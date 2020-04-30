import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../axios-orders'
import * as actions from '../../../store/actions/index'
const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
              touched: false
            },
              street: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              country: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
                },
                value: '',
                validation: {
                  required: true,
                  touched: false
                },
                valid: false
              },
              zipcode: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                  required: true,
                  equalLength: 5,
                  maxLength: 5
                },
                valid: false,
                touched: false
              },
              email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email'
                },
                value: '',
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },
              telephone: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Your Phone'
                },
                value: '',
                validation: {
                  required: true,
                  minLengthPhone: 9,
                  maxLengthPhone: 10
                },
                valid: false,
                touched: false
              },
              landmark: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Landmark around you (Optional)'
                },
                value: '',
                validation: {
                  required: false
                },
                valid: true,
                touched: true
              },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
              ]
            },
            validation: {
              required: false
            },
            value: 'fastest' ,
            valid: true
          }
          })
          const [ formIsValid, setFormIsValid] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let formElementIdentifier in orderForm) {
          formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const order = {
        ingredients: props.ings,
        price: props.price,
        orderData: formData
        }
        props.onOrderCake(order)
        
      }
  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm
    }
    const updatedFormElement = { 
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidility(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    console.log(updatedFormElement)
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }
  const checkValidility = (value, rules) => {
    let isValid = true
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.equalLength) {
      isValid = value.length === 5 && isValid;
    }
    if(rules.minLength){
      isValid = value.length > 5 && isValid;
    }
    if(rules.minLengthPhone) {
      isValid = value.length >= 9 && isValid;
    }
    if(rules.maxLengthPhone) {
      isValid = value.length  <= 10 && isValid;
    }
    return isValid
  }
        const formElementsArray = []
        for(let key in orderForm) {
          formElementsArray.push({
            id: key,
            config: orderForm[key]
          })
        }
        let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
              <Input 
                key={formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate=  {formElement.config.validation}
                touched= {formElement.config.touched}
                changed = {(event) => inputChangeHandler(event, formElement.id)}
              />
            ))}
            <Button disabled={!formIsValid}>ORDER</Button>
         </form>
        )
        if(props.loading) {
            form = <Spinner />
        }
        
        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        )
}
const mapStateToProps = state => {
  return {
    ings: state.cakeBuilder.ingredients,
    price: state.cakeBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderCake: (orderData) => dispatch(actions.purchaseCake(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))