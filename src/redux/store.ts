import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productsReducers } from "./reducers/productReducer"
import { usersReducers } from "./reducers/userReducer"
import { cartReducers } from "./reducers/cartReducer"
import { ordersReducers } from "./reducers/orderReducer"
import { callAPIMiddleware } from "./middlewares.redux"
import logger from 'redux-logger'

const rootReducer = combineReducers({
    products:productsReducers,
    user:usersReducers,
    cart:cartReducers,
    orders:ordersReducers
})

const middlewares = [thunk, callAPIMiddleware,logger]
const configureStore = createStore(rootReducer,applyMiddleware(...middlewares));

export default configureStore;