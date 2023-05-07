import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: [],
}

export const userSlice = createSlice({
    name: 'trans',
    initialState,
    reducers: {
        setTrans: (state, action) => {
            state.transactions = action.payload;
        },
    }
})
const { reducer, actions } = userSlice;

export const { setTrans } = actions;
export default reducer;

