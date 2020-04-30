import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import '../../UI/Button/Button'
const OrderSummary = props => {
    // This could be a functional component,doesn't have to be a class
        const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
        })
        return(
             <Aux>
            <h3>Your Order</h3>
            <p>A good cake with the follow ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><string>Total Price : {props.price.toFixed(2)} Baht</string></p>
            <p>Continue to Checkout?</p>
            <button className="Danger" onClick={props.purchaseCanceled}>CANCEL</button>
            <button className="Success" onClick={props.purchaseContinued}>CONTINUE</button>
        </Aux>
        )
    }

export default OrderSummary