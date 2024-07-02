import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false,
        role: null,
        error: null
    },
    reducers: {
        auth: (state, action) => {
            // Here state represents the current state of the userSlice i.e. 'user: null'/ initialState
            switch (action.type) {
                case 'LOGIN' || 'SIGNUP':
                    return {
                        ...state,
                        isLoggedIn: true,
                        user: action.payload.user,
                        role: action.payload.role
                    }
                case 'FAILURE':
                    return {
                        ...state,
                        error: action.payload
                    }
                case 'LOGOUT':
                    return {
                        ...state,
                        isLoggedIn: false,
                        user: null
                    }
                default: return state;
            }
            // state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export const { auth, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer