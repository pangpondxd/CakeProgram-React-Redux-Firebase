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
          dispatch(purchaseCakeSuccess(res.data.name, orderData))
        })
        .catch(err => {
          dispatch(purchaseCakeFail(err))
      })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
            
        }).catch(err => {
            dispatch(fetchOrdersFail(err))
        })
    }
}

