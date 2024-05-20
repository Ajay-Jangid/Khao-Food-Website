import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false,
        loginDetails: {}
    },
    reducers: {
        updateIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.value;
        },

        updateLoginDetails: (state, action) => {
            state.loginDetails = action.payload.value;
        }
    }
});


export const { updateIsAuthenticated, updateLoginDetails } = loginSlice.actions;

export default loginSlice.reducer;