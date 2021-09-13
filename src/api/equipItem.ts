import { EquipItemType } from '@/types/inventory'
import { dbService } from '../utils/fbase'
const EQUIP = 'equip'

export const getAllEquip = async (): Promise<void> => {
  const res = await dbService.collection(EQUIP).get()
  res.forEach((document) => console.log(document.data()))
}
export const addEquip = async (newEquip: EquipItemType): Promise<void> => {
  const res = await dbService.collection(EQUIP).add(newEquip)
  console.log(res)
}
