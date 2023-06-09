import {createStore,applyMiddleware,combineReducers} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'


const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')):[]

const initialState = {
    cart : {cartItems: cartItemsFromStorage}
}
const intialState = {}
const middleware = [thunk]

const store = createStore(reducer, intialState,
    composeWithDevTools(applyMiddleware(...middleware)))
// const store = configureStore({
//     reducer: reducer,
//     // preloadedState: initialState,
//     middleware: middleware,
// });
 
export default store;

