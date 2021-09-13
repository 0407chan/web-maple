import { removeEquip, setEquip } from '@/feature/equipment/equipmentSlice'
import { RootState } from '@/store'
import { EquipSlotCategory } from '@/types/equipment'
import { EquipItemType } from '@/types/inventory'
import { useDispatch, useSelector } from 'react-redux'

const useEquipment = () => {
  const dispatch = useDispatch()
  const equipment = useSelector((state: RootState) => state.equipment.equipment)

  const onSetEquip = (slotType: EquipSlotCategory, item: EquipItemType) =>
    dispatch(setEquip({ slotType, item }))

  const onRemoveEquip = (slotType: EquipSlotCategory) =>
    dispatch(removeEquip({ slotType }))

  return {
    equipment,
    onSetEquip,
    onRemoveEquip
  }
}

export default useEquipment
