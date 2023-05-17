import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null,
    login: null,
    isAuth: false,
};

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
};

export const setAuthUserData = (id,  login, isAuth) => ({
    type: SET_USER_DATA,
    payload:{ id, login, isAuth }
});

export const getAuthUserData = () => async (dispatch) => {
    
    let response = await authAPI.check();
    console.log(response)
    if (response.response == 1) {
        let { id, login } = response.data;
        dispatch(setAuthUserData(id, login, true));
    }
};



export const login = (login, password ) => async (dispatch) => {

    let response = await authAPI.login({login, password });

    if (response.response === 1) {
        dispatch(getAuthUserData());
        
    } 
};

export const logout = () => async (dispatch) => {
    console.log('logout')
    let response = await authAPI.logout();
    if (response.response == 1) {
        dispatch(setAuthUserData(null, null, false));
    }

};

export default authReducer;
