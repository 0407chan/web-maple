import { EquipSlotCategory, EquipSlotType } from '@/types/equipment'
import { EquipItemType } from '@/types/inventory'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InventoryState = {
  equipment: EquipSlotType[]
  currentItem?: EquipItemType
}

const emptyInven: EquipSlotType[] = []
emptyInven.push({ id: 0, slotType: 'CAP', isOpen: true })
emptyInven.push({ id: 1, slotType: 'CAPE', isOpen: true })
emptyInven.push({ id: 2, slotType: 'CLOTHES', isOpen: true })
emptyInven.push({ id: 3, slotType: 'EYE', isOpen: true })
emptyInven.push({ id: 4, slotType: 'GLOVES', isOpen: true })
emptyInven.push({ id: 5, slotType: 'PANTS', isOpen: true })
emptyInven.push({ id: 6, slotType: 'PENDANT', isOpen: true })
emptyInven.push({ id: 7, slotType: 'RING', isOpen: true })
emptyInven.push({ id: 8, slotType: 'SHOES', isOpen: true })
emptyInven.push({ id: 9, slotType: 'WEAPON', isOpen: true })

const initialState: InventoryState = {
  equipment: emptyInven,
  currentItem: undefined
}

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquip: (
      state,
      action: PayloadAction<{
        slotType: EquipSlotCategory
        item: EquipItemType
      }>
    ) => {
      state.equipment = state.equipment.map((equip) => {
        if (equip.slotType === action.payload.slotType) {
          return { ...equip, item: action.payload.item }
        }
        return equip
      })
    },
    removeEquip: (
      state,
      action: PayloadAction<{
        slotType: EquipSlotCategory
      }>
    ) => {
      state.equipment = state.equipment.map((equip) => {
        if (equip.slotType === action.payload.slotType) {
          return { ...equip, item: undefined }
        }
        return equip
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { setEquip, removeEquip } = equipmentSlice.actions

export default equipmentSlice.reducer
