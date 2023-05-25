
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import productsReducer from "./products-reducer";
import productReducer from "./product-reducer";
import workersReducers from "./workers-reducer";
import storageReducer from "./storage-reducer";
import ordersReducer from "./orders-reducer";
const { combineReducers, legacy_createStore, applyMiddleware, compose } = require("redux");


let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    // profile: profileReducer,
    product: productReducer,
    products: productsReducer,
    workers: workersReducers,
    storage: storageReducer,
    orders: ordersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = legacy_createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware )));

window.store = store;

export default store;