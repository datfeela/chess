import { configureStore } from '@reduxjs/toolkit'
import chessSlice from './chessSlice'

export const store = configureStore({
    reducer: {
        chess: chessSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
