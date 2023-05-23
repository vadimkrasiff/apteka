import { Navigate } from "react-router-dom";
import { authAPI } from "../api/api";
import { initializedSucces } from "./app-reducer";

const SET_USER_DATA = "SET_USER_DATA";
const SET_ERROR = "SET_ERROR";

let initialState = {
    id: null,
    login: null,
    rol: null,
    address:null,
    isAuth: false,
    error: null,
    
};

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload
            }
        case  SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export const setAuthUserData = (id,  login, rol, address, isAuth, error) => ({
    type: SET_USER_DATA,
    payload:{ id, login, rol, address, isAuth, error}
});

export const getAuthUserData = () => async (dispatch) => {
    
    let response = await authAPI.check();
    if (response.response == 1) {
        let { id, login, rol, address } = response.data;
        dispatch(setAuthUserData(id, login, rol, address, true, null));
    }
};



export const login = (login, password ) => async (dispatch) => {

    let response = await authAPI.login({login, password });

    if (response.response === 1) {
        dispatch(initializedSucces(false))
        dispatch(getAuthUserData());
        setTimeout(()=> dispatch(initializedSucces(true)),1000)  
    } else {
        dispatch(setAuthUserData(null, null, null, null, false, response.message));
    }
};

export const logout = () => async (dispatch) => {
    console.log('logout')
    let response = await authAPI.logout();
    if (response.response == 1) {
        dispatch(initializedSucces(false))
        dispatch(setAuthUserData(null, null, null, false, null));
        setTimeout(()=> dispatch(initializedSucces(true)),1000)
    }
};

export const register =(data) => async(dispatch) => {
    let response = await authAPI.regist(data);
    if (response.response === 1) {
        dispatch(initializedSucces(false))
        dispatch(getAuthUserData());
        setTimeout(()=> dispatch(initializedSucces(true)),1000);
        return true
        
    } else {
        dispatch(setAuthUserData(null, null, null, null, false, response.message));
        return false
    }
}

export default authReducer;
