import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const purchaseCakeSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_CAKE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseCakeFail = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_CAKE_FAIL,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseCakeStart = () => {
    return {
        type: actionTypes.PURCHASE_CAKE_START
    }
}

export const purchaseCake = (orderData) => {
    return dispatch => {
        dispatch(purchaseCakeStart())
        axios
        .post('/orders.json', orderData)
        .then(res => {
            console.log(res.data)
          dispatch(purchaseCakeSuccess(res.data, orderData))
        })
        .catch(err => {
          dispatch(purchaseCakeFail(err))
      })
    }
}