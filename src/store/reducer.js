import * as actionTypes from './actions'

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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        default:
            return state
    }
}

export default reducer