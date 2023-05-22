import { productsAPI } from "../api/api";

const GET_DATA_PRODUCTS = "GET_DATA_PRODUCTS";
const SET_FETCHING = 'SET_FETCHING';
const SET_CATEGORIES = 'SET_CATEGORIES';

let initialState = {
    items: null,
    isFetching: false,
    totalCount: null,
    categories: null
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
            case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state;
    }
}

const setProductsData = (items) => ({ type: GET_DATA_PRODUCTS, items });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setCategories = (categories) => ({ type: SET_CATEGORIES, categories });

export const getDataProducts = () => async (dispatch) => {
   
    dispatch(setFetching(true))
    let response = await productsAPI.getProducts();
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
        dispatch(setProductsData(response.items))
}

export const getCategories = () => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.getCategories();
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
        dispatch(setCategories(response.items))
}

export const createProduct = (data) => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.createProduct(data);
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
    dispatch(getDataProducts())
}

export const updateProduct = (data) => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.updateProduct(data);
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
    dispatch(getDataProducts())
}


export default productsReducer;