import { configureStore } from "@reduxjs/toolkit";
import useReducer from './userSlice'
import transReducer from '../Transation/transSlice'

export const store = configureStore({
    reducer: {
        user: useReducer,
        trans: transReducer,
    },
})
export default store;