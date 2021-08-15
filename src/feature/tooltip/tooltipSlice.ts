import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ToolTipState = {
  visible: boolean
  mouseX: number
  mouseY: number
}

export const initialState: ToolTipState = {
  visible: false,
  mouseX: 0,
  mouseY: 0
}

export const tooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    showTooltip: (state) => {
      state.visible = true
    },
    hideTooltip: (state) => {
      state.visible = false
    },
    setMousePosition: (
      state,
      action: PayloadAction<{ mouseX: number; mouseY: number }>
    ) => {
      state.mouseX = action.payload.mouseX
      state.mouseY = action.payload.mouseY
    }
  }
})

// Action creators are generated for each case reducer function
export const { showTooltip, hideTooltip, setMousePosition } =
  tooltipSlice.actions

export default tooltipSlice.reducer
