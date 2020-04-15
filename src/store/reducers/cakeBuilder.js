import * as actionTypes from '../actions/actionTypes'

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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    chocolate: action.ingredients.chocolate,
                    strawberry: action.ingredients.strawberry,
                    blueberry: action.ingredients.blueberry,
                    vanilla: action.ingredients.vanilla,
                    lemon: action.ingredients.lemon,
                    orange: action.ingredients.orange
                },
                error: false
            }
            case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer