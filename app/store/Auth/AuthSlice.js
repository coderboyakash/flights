"use client";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "Akash Chowdhury",
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        testChange: (state) => {
            state.user = "test title"
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = AuthSlice.actions

export const selectUser = (state) => state.auth.user

export default AuthSlice.reducer