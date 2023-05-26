import { ordersAPI } from "../api/api";

const SET_FETCHING_ORDER = 'SET_FETCHING';
const SET_ORDERS = 'SET_ORDERS';
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

let initialState = {
    isFetching: false,
    orders: null,
    subOrder: null
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHING_ORDER:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }

        case SET_CURRENT_ORDER:
            return {
                ...state,
                subOrder: action.subOrder
            }
        default:
            return state;
    }
}

export const setFetching = (isFetching) => ({ type: SET_FETCHING_ORDER, isFetching });
export const setOrders = (orders) => ({ type: SET_ORDERS, orders });
export const setSubOrder = (subOrder) => ({ type: SET_CURRENT_ORDER, subOrder });


export const getOrders = () => async (dispatch) => {

    dispatch(setFetching(true))
    let response = await ordersAPI.getOrders();
    setTimeout(() => dispatch(setFetching(false)), 300);

    if (response.response === 1)
        dispatch(setOrders(response.items))
}

export const getSubOrder = () => async (dispatch) => {

    dispatch(setFetching(true))
    let response = await ordersAPI.getSubOrder();
    setTimeout(() => dispatch(setFetching(false)), 300);

    if (response.response === 1)
        dispatch(setSubOrder(response.items))
}

export const createOrder = (data) => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await ordersAPI.createOrder(data);
    setTimeout(() => dispatch(setFetching(false)), 300);

    if (response.response === 1)
        dispatch(getOrders())
}


export default ordersReducer;