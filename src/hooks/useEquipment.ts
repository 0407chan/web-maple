import {
  EquipSlotType,
  ISlotsType
} from 'domains/EquipmentStore/types/equipment.types'
import {
  removeEquip,
  setEquip,
  updateEquipSlot
} from 'feature/equipment/equipmentSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
import { EquipItemType } from 'types/inventory'

const useEquipment = () => {
  const dispatch = useAppDispatch()
  const equipment = useAppSelector(
    (state: RootState) => state.equipmentReducer.equipment
  )

  const onSetEquip = (iSlotType: ISlotsType, item: EquipItemType) =>
    dispatch(setEquip({ iSlotType, item }))

  const onRemoveEquip = (iSlotType: ISlotsType) =>
    dispatch(removeEquip({ iSlotType }))

  const onUpdateEquipSlot = (slot: EquipSlotType) =>
    dispatch(updateEquipSlot({ slot }))

  return {
    equipment,
    onSetEquip,
    onRemoveEquip,
    onUpdateEquipSlot
  }
}

export default useEquipment
