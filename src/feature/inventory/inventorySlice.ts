import { EQUIP_LIST } from '@/dummy/equip'
import {
  EquipType,
  InventoryType,
  InventoryTypeValue,
  SlotType
} from '@/types/inventory'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InventoryState = {
  currentInventory: number
  invenEquip: SlotType[]
  equipMaxNum: number
  currentItem?: EquipType
}

const SlotList: SlotType[] = []
for (let i = 0; i < 24; i++) {
  const randomNum = Math.floor(Math.random() * EQUIP_LIST.length)
  let item: EquipType | undefined = undefined
  if (i < 4) {
    item = EQUIP_LIST[randomNum]
  }
  const newSlot: SlotType = { id: i, item }
  SlotList.push(newSlot)
}

const initialState: InventoryState = {
  currentInventory: 0,
  invenEquip: SlotList,
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
    addEquipment: (state, action: PayloadAction<SlotType>) => {
      const newSlot = action.payload
      const newInven = state.invenEquip.map((slot) => {
        if (slot.id === newSlot.id) {
          return newSlot
        } else {
          return slot
        }
      })
      state.invenEquip = [...newInven]
    },
    setCurrentItem: (state, action: PayloadAction<EquipType | undefined>) => {
      state.currentItem = action.payload
    },
    switchSlot: (
      state,
      action: PayloadAction<{ startSlot: SlotType; nextSlot: SlotType }>
    ) => {
      const startSlot = action.payload.startSlot
      const nextSlot = action.payload.nextSlot
      const newInven = state.invenEquip.map((slot) => {
        if (slot.id === startSlot.id) {
          return { ...slot, item: nextSlot.item }
        } else if (slot.id === nextSlot.id) {
          return { ...slot, item: startSlot.item }
        } else {
          return slot
        }
      })
      state.invenEquip = [...newInven]
    }
  }
})

// Action creators are generated for each case reducer function
export const { setInventory, addEquipment, setCurrentItem, switchSlot } =
  inventorySlice.actions

export default inventorySlice.reducer
