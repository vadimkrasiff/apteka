import { workersAPI } from "../api/api";


const SET_WORKERS_DATA = "SET_WORKERS_DATA";
const SET_FETCHING = 'SET_FETCHING';


let initialState = {
    workers: null,
    isFetching: false
}

let workersReducers = (state=initialState, action) => {
    switch (action.type) {
        case SET_WORKERS_DATA:
          return {
            ...state,
            workers: action.workers,
          };
        case SET_FETCHING:
          return {
            ...state,
            isFetching: action.isFetching,
          };
        default:
          return state;
      }
}

const setWorkersData = (workers) => ({ type: SET_WORKERS_DATA, workers });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });

export const getDataWorkers = () => async (dispatch) => {
   
    dispatch(setFetching(true))
    let response = await workersAPI.getWorkers();
    dispatch(setFetching(false))
    
    if (response.response === 1)
        dispatch(setWorkersData(response.items))
}

export default workersReducers;