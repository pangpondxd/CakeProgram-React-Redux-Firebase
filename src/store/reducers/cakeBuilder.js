import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: {
        chocolate: 0,
        strawberry: 0,
        blueberry: 0,
        vanilla: 0,
        lemon: 0,
        orange: 0
    },
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
        default:
            return state
    }
}

export default reducer