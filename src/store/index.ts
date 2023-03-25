import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'feature/counter/counterSlice'
import equipmentReducer from 'feature/equipment/equipmentSlice'
import inventoryReducer from 'feature/inventory/inventorySlice'
import itemReducer from 'feature/item/itemSlice'
import tooltipReducer from 'feature/tooltip/tooltipSlice'
import uiWindowReducer from 'feature/uiWindow/uiWindowSlice'
import userReducer from 'feature/user/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inventory: inventoryReducer,
    tooltip: tooltipReducer,
    user: userReducer,
    uiWindow: uiWindowReducer,
    equipment: equipmentReducer,
    item: itemReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
