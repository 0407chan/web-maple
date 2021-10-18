import { EquipmentItemListType } from '@/types/equipment'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type ItemState = {
  equipmentItemList: EquipmentItemListType[]
}

const initialState: ItemState = {
  equipmentItemList: []
}

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    initEquipItemList: (
      state,
      action: PayloadAction<EquipmentItemListType[]>
    ) => {
      state.equipmentItemList = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { initEquipItemList } = itemSlice.actions

export default itemSlice.reducer
