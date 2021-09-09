import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UiWindowState = {
  uiWindowList: Set<string>
}

export const initialState: UiWindowState = {
  uiWindowList: new Set()
}

export const uiWindowSlice = createSlice({
  name: 'uiWindow',
  initialState,
  reducers: {
    removeUiWindow: (state, action: PayloadAction<{ windowName: string }>) => {
      const result = new Set(state.uiWindowList)
      result.delete(action.payload.windowName)
      state.uiWindowList = result
    },
    addUiWindow: (state, action: PayloadAction<{ windowName: string }>) => {
      const result = new Set(state.uiWindowList)
      result.add(action.payload.windowName)
      state.uiWindowList = result
    }
  }
})

// Action creators are generated for each case reducer function
export const { removeUiWindow } = uiWindowSlice.actions

export default uiWindowSlice.reducer
