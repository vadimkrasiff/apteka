import { productsAPI } from "../api/api";

const SET_FETCHING = 'SET_FETCHING';
const SET_STORAGE= 'SET_STORAGE';

let initialState = {
    isFetching: false,
    storage: null,
}


const storageReducer = (state = initialState, action) => {
    switch (action.type) {
            case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
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

export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setStorage = (storage) => ({ type: SET_STORAGE, storage });


export const getStorage = () => async (dispatch) => {
   
    dispatch(setFetching(true))
    let response = await productsAPI.getStorage();
    setTimeout(() => dispatch(setFetching(false)), 300);
    
    if (response.response === 1)
        dispatch(setStorage(response.items))
}

export default storageReducer;