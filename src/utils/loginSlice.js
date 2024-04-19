import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        updateIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.value;
        }
    }
});


export const { updateIsAuthenticated } = loginSlice.actions;

export default loginSlice.reducer;