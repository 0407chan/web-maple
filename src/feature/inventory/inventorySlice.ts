import { EQUIP_LIST } from '@/dummy/equip'
import { EquipType, InventoryType, InventoryTypeValue } from '@/types/inventory'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface InventoryState {
  currentInventory: number
  invenEquip: (EquipType | undefined)[]
  equipMaxNum: number
  currentItem?: EquipType
}

const initialState: InventoryState = {
  currentInventory: 0,
  invenEquip: EQUIP_LIST,
  equipMaxNum: 24,
  currentItem: undefined
}

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventory: (state, action: PayloadAction<InventoryType>) => {
      state.currentInventory = InventoryTypeValue[action.payload]
    },
    addEquipment: (state, action: PayloadAction<EquipType>) => {
      state.invenEquip.push(action.payload)
    },
    setCurrentItem: (state, action: PayloadAction<EquipType | undefined>) => {
      state.currentItem = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setInventory, addEquipment, setCurrentItem } =
  inventorySlice.actions

export default inventorySlice.reducer
