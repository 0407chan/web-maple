import { initEquipItemList } from 'feature/item/itemSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'
import { EquipmentItemListType } from 'types/equipment'

const useInventory = () => {
  const dispatch = useAppDispatch()

  const equipmentItemList = useAppSelector(
    (state: RootState) => state.itemReducer.equipmentItemList
  )

  const onInitEquipItemList = (newItemList: EquipmentItemListType[]) =>
    dispatch(initEquipItemList(newItemList))

  return {
    equipmentItemList,
    onInitEquipItemList
  }
}

export default useInventory
