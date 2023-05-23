import { productsAPI } from "../api/api";

const GET_DATA_PRODUCTS = "GET_DATA_PRODUCTS";
const SET_FETCHING = 'SET_FETCHING';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_PHARMACIES= 'SET_PHARMACIES';
const SET_STORAGE= 'SET_STORAGE';

let initialState = {
    items: null,
    isFetching: false,
    totalCount: null,
    categories: null,
    pharmacies: null,
    storage: null,
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
            case SET_PHARMACIES:
            return {
                ...state,
                pharmacies: action.pharmacies
            }
            
            case SET_STORAGE:
            return {
                ...state,
                storage: action.storage
            }
        default:
            return state;
    }
}

const setProductsData = (items) => ({ type: GET_DATA_PRODUCTS, items });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setCategories = (categories) => ({ type: SET_CATEGORIES, categories });
export const setPharmacies = (pharmacies) => ({ type: SET_PHARMACIES, pharmacies });
export const setStorage = (storage) => ({ type: SET_PHARMACIES, storage });

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

export const getPharmacies = () => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.getPharmacies();
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
        dispatch(setPharmacies(response.items))
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

export const deleteProduct = (data) => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await productsAPI.deleteProduct(data);
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
    dispatch(getDataProducts())
}


export default productsReducer;