import { initEquipItemList } from 'feature/item/itemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { EquipmentItemListType } from 'types/equipment'

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
