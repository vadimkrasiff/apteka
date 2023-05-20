import { authAPI } from "../api/api";
import { initializedSucces } from "./app-reducer";

const SET_USER_DATA = "SET_USER_DATA";
const SET_ERROR = "SET_ERROR";

let initialState = {
    id: null,
    login: null,
    rol: null,
    isAuth: false,
    error: null
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

export const setAuthUserData = (id,  login, rol, isAuth, error) => ({
    type: SET_USER_DATA,
    payload:{ id, login, rol, isAuth, error}
});

export const getAuthUserData = () => async (dispatch) => {
    
    let response = await authAPI.check();
    if (response.response == 1) {
        let { id, login, rol } = response.data;
        dispatch(setAuthUserData(id, login, rol, true, null));
    }
};



export const login = (login, password ) => async (dispatch) => {

    let response = await authAPI.login({login, password });

    if (response.response === 1) {
        dispatch(initializedSucces(false))
        dispatch(getAuthUserData());
        setTimeout(()=> dispatch(initializedSucces(true)),1000)  
    } else {
        dispatch(setAuthUserData(null, null, false, response.message));
    }
};

export const logout = () => async (dispatch) => {
    console.log('logout')
    let response = await authAPI.logout();
    if (response.response == 1) {
        dispatch(initializedSucces(false))
        dispatch(setAuthUserData(null, null, false, null));
        setTimeout(()=> dispatch(initializedSucces(true)),1000)
    }
};

export const regist =(data) => async(dispatch) => {
    let response = await authAPI.regist();
    if (response.response == 1) {
        
    }
}

export default authReducer;
