import { productsAPI } from "../api/api";


const GET_DATA_PRODUCT = "GET_DATA_PRODUCT";

const SET_FETCHING = 'SET_FETCHING';

const SET_ERROR_PRODUCT = "SET_ERROR_PRODUCT"; 

let initialState = {
    items: null,
    isFetching: false,
    error: null,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_PRODUCT:
            return {
                ...state,
                items: action.items
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_ERROR_PRODUCT: 
        return {
            ...state,
            items: action.items,
            error: action.error
        };
        default:
            return state;
    }
}

export const setProductData = (items) => ({type:GET_DATA_PRODUCT, items});
export const setFetching = (isFetching) => ({type: SET_FETCHING, isFetching});
export const setErrorProduct = (items,error) => ({type: SET_ERROR_PRODUCT, items, error});  

export const getDataProduct = (id) => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.getProduct(id);
    if (response.response == 1) {
        dispatch(setProductData(response.items));
    } else {
        dispatch(setErrorProduct([],response.message));
    }
    setTimeout(()=> dispatch(setFetching(false)), 300)
}

export default productReducer;