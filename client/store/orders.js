import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

const initialState = {
  orders: []
}

export const gotOrders = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/users/orders/${userId}`)
    const userOrders = response.data
    dispatch(getOrders(userOrders))
  }
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    default:
      return state
  }
}

export default orderReducer