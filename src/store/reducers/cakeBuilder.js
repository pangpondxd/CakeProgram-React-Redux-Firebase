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

const addIngredient = (state, action) => {
    const updatedIngredient =  { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const removeUpdatedIngredient =  { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const removeUpdatedIngredients = updateObject(state.ingredients, removeUpdatedIngredient)
            const removeUpdatedState = {
                ingredients: removeUpdatedIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, removeUpdatedState)
}

const setIngredient = (state, action) => {
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
}

const fetchIngredient = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredient(state, action)
        default: return state
    }
}

export default reducer