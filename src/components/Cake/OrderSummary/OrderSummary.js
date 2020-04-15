import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import '../../UI/Button/Button'
class OrderSummary extends Component {
    // This could be a functional component,doesn't have to be a class
    componentWillUpdate(){
        console.log('[OrderSummary] will updated')
    }
    
    render() {
    

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>)
        })
        return(
             <Aux>
            <h3>Your Order</h3>
            <p>A good cake with the follow ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><string>Total Price : {this.props.price.toFixed(2)} Baht</string></p>
            <p>Continue to Checkout?</p>
            <button className="Danger" onClick={this.props.purchaseCanceled}>CANCEL</button>
            <button className="Success" onClick={this.props.purchaseContinued}>CONTINUE</button>
        </Aux>
        )
    }
}

export default OrderSummary