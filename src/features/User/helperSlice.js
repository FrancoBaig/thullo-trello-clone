import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: {
        login: false,
        boards: false,
        board: false,
    },
    error: {
        login: "",
        signup: "",
    },
    success: {
        signup: false,
    },
};

export const helperSlice = createSlice({
    name: "helper",
    initialState,
    reducers: {
        setLoadingAllBoards(state, action) {
            const value = action.payload;

            return {
                ...state,
                loading: {
                    ...state.loading,
                    boards: value,
                },
            };
        },
        setLoadingBoard(state, action) {
            const value = action.payload;

            return {
                ...state,
                loading: {
                    ...state.loading,
                    board: value,
                },
            };
        },
        setLoadingLogin(state, action) {
            const value = action.payload;

            return {
                ...state,
                loading: {
                    ...state.loading,
                    login: value,
                },
            };
        },
        setLoginError(state, action) {
            const message = action.payload;
            return {
                ...state,
                error: {
                    ...state.error,
                    login: message,
                },
            };
        },
        setSignupSuccess(state, action) {
            const value = action.payload;

            return {
                ...state,
                success: {
                    signup: value,
                },
            };
        },
    },
});

export const {
    setLoadingAllBoards,
    setLoadingBoard,
    setLoadingLogin,
    setLoginError,
    setSignupSuccess,
} = helperSlice.actions;
export default helperSlice.reducer;
