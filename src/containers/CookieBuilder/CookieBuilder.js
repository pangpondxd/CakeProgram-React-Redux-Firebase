import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Cookie from '../../components/Cookie/Cookie'
import BuildControls from '../../components/Cookie/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 20
}
class CookieBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:{
            salad:0,
            cheese:0
        },
        totalPrice: 2
    }

    addIngredientHandle = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }
  
    render () {
        return (
            <Aux>
                <div>Hello world</div>
                <Cookie ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredientHandle}
                />
            </Aux>
        )
    }
}

export default CookieBuilder