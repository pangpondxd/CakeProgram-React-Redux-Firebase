import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Cookie from '../../components/Cookie/Cookie'
import BuildControls from '../../components/Cookie/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Cookie/OrderSummary/OrderSummary'

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
        totalPrice: 10,
        purchasable: false,
        purchasing: false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseable: sum > 0})
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
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandle = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandle = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} /> 
                </Modal> 
                <div>Hello world</div>
                <Cookie ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredientHandle}
                ingredientRemoved={this.removeIngredientHandle}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchaseable}
                ordered={this.purchaseHandle}
                />
            </Aux>
        )
    }
}

export default CookieBuilder