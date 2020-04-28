import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false})
}

const purchaseCakeStart = (state, action) => {
    return updateObject(state, {loading:true}) 
 }

const purchaseCakeSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id:action.orderId})
    return updateObject(state, {loading:false,
        orders: state.orders.concat(newOrder),
        purchased:true 
    })
}

const purchaseCakeFail = (state, action) => {
    return updateObject(state, {loading:false})
}

const fetchOrderStart = (state, action) => {
    return updateObject(state,{loading:true})
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders,
        loading: false
        })
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {loading:false})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.PURCHASE_CAKE_START: return purchaseCakeStart(state, action)
        case actionTypes.PURCHASE_CAKE_SUCCESS: return purchaseCakeSuccess(state, action)
        case actionTypes.PURCHASE_CAKE_FAIL: return purchaseCakeFail(state, action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action)
        default: return state
    }
}

export default reducer