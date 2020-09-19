import { dbService } from "../utils/fbase";
import { EquipType } from "../modules/inventory";
const EQUIP = "equip";

const getAllEquip = async () => {
  const res = await dbService.collection(EQUIP).get();
  res.forEach((document) => console.log(document.data()));
};
const addEquip = async (newEquip: EquipType) => {
  const res = await dbService.collection(EQUIP).add(newEquip);
  console.log(res);
};

export default {
  getAllEquip,
  addEquip,
};
