import counterReducer from '@/feature/counter/counterSlice'
import inventoryReducer from '@/feature/inventory/inventorySlice'
import tooltipReducer from '@/feature/tooltip/tooltipSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inventory: inventoryReducer,
    tooltip: tooltipReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
