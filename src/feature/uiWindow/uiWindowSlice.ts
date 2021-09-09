import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//export type UiWindowType = 'Inventory' | 'Equip' | 'Skill'

export type UiWindowState = {
  uiWindowList: string[]
}

export const initialState: UiWindowState = {
  uiWindowList: ['Inventory']
}

export const uiWindowSlice = createSlice({
  name: 'uiWindow',
  initialState,
  reducers: {
    removeUiWindow: (state, action: PayloadAction<{ windowName: string }>) => {
      state.uiWindowList = state.uiWindowList.filter(
        (item) => item !== action.payload.windowName
      )
    },
    addUiWindow: (state, action: PayloadAction<{ windowName: string }>) => {
      state.uiWindowList = [...state.uiWindowList, action.payload.windowName]
    }
  }
})

// Action creators are generated for each case reducer function
export const { removeUiWindow, addUiWindow } = uiWindowSlice.actions

export default uiWindowSlice.reducer
