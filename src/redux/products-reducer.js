import { productsAPI } from "../api/api";

const GET_DATA_PRODUCTS = "GET_DATA_PRODUCTS";
const SET_FETCHING = 'SET_FETCHING';

let initialState = {
    items: null,
    isFetching: false,
    totalCount: null
}


const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_PRODUCTS:
            return {
                ...state,
                items: action.items
            };
            case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

const setProductsData = (items) => ({ type: GET_DATA_PRODUCTS, items });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });

export const getDataProducts = () => async (dispatch) => {
   
    dispatch(setFetching(true))
    let response = await productsAPI.getProducts();
    setTimeout(() => dispatch(setFetching(false)), 300)
    console.log(response.items)
    if (response.response === 1)
        dispatch(setProductsData(response.items))
    // dispatch(setTotalCount(response.totalCount))
}

export default productsReducer;