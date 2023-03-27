import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from 'feature/counter/counterSlice'
import equipmentReducer from 'feature/equipment/equipmentSlice'
import inventoryReducer from 'feature/inventory/inventorySlice'
import itemReducer from 'feature/item/itemSlice'
import tooltipReducer from 'feature/tooltip/tooltipSlice'
import uiWindowReducer from 'feature/uiWindow/uiWindowSlice'
import userReducer from 'feature/user/userSlice'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
  whitelist: ['inventoryReducer']
}

const rootReducer = combineReducers({
  counterReducer,
  inventoryReducer,
  tooltipReducer,
  userReducer,
  uiWindowReducer,
  equipmentReducer,
  itemReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
