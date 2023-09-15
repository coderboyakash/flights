"use client";
import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../../app/store/Auth/AuthSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    },
})