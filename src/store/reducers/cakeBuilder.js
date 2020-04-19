import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 0
}
 const INGREDIENT_PRICES = {
    chocolate: 250,
    strawberry: 199,
    blueberry: 199,
    vanilla: 199,
    lemon: 199,
    orange: 199
  };
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient =  { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const removeUpdatedIngredient =  { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const removeUpdatedIngredients = updateObject(state.ingredients, removeUpdatedIngredient)
            const removeUpdatedState = {
                ingredients: removeUpdatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, removeUpdatedState)
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    chocolate: action.ingredients.chocolate,
                    strawberry: action.ingredients.strawberry,
                    blueberry: action.ingredients.blueberry,
                    vanilla: action.ingredients.vanilla,
                    lemon: action.ingredients.lemon,
                    orange: action.ingredients.orange
                },
                totalPrice: 0,
                error: false
            })
            case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return updateObject(state, {error: true})
        default:
            return state
    }
}

export default reducer