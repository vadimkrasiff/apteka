import { ordersAPI } from "../api/api";

const SET_FETCHING = 'SET_FETCHING';
const SET_ORDERS= 'SET_ORDERS';

let initialState = {
    isFetching: false,
    orders: null,
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
            case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
            case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        default:
            return state;
    }
}

export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setOrders = (orders) => ({ type: SET_ORDERS, orders });


export const getOrders = () => async (dispatch) => {
   
    dispatch(setFetching(true))
    let response = await  ordersAPI.getOrders();
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
        dispatch(setOrders(response.items))
}

export default ordersReducer;