import { initEquipItemList } from '@/feature/item/itemSlice'
import { RootState } from '@/store'
import { EquipmentItemListType } from '@/types/equipment'
import { useDispatch, useSelector } from 'react-redux'

const useInventory = () => {
  const dispatch = useDispatch()

  const equipmentItemList = useSelector(
    (state: RootState) => state.item.equipmentItemList
  )

  const onInitEquipItemList = (newItemList: EquipmentItemListType[]) =>
    dispatch(initEquipItemList(newItemList))

  return {
    equipmentItemList,
    onInitEquipItemList
  }
}

export default useInventory
