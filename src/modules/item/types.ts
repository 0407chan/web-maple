import { setInvenEquip } from "./reducer";

export type InventoryAction = ReturnType<typeof setInvenEquip>;

export type SlotType = {
  id: number;
};

export type InventoryState = {
  currInven: number;
  inventory: SlotType[][];
};

export const initialState: InventoryState = {
  currInven: 0,
  inventory: new Array(4).fill(null).map(() => new Array(0).fill(null)),
};
