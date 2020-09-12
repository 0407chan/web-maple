import {
  setInvenEquip,
  setInvenEtc,
  setInvenSetup,
  setInvenUse,
  addEquip,
  deleteEquip,
  setCurrItem,
} from "./reducer";

import { equips, emptyEquip } from "../../dummy/equip";

export type InventoryAction =
  | ReturnType<typeof setInvenEquip>
  | ReturnType<typeof setInvenEtc>
  | ReturnType<typeof setInvenSetup>
  | ReturnType<typeof setInvenUse>
  | ReturnType<typeof addEquip>
  | ReturnType<typeof deleteEquip>
  | ReturnType<typeof setCurrItem>;

export type EquipType = {
  id: number;
  name: string;
  image: string;

  STR: number;
  DEX: number;
  INT: number;
  LUK: number;
  MaxHP: number;
  MaxMP: number;
  WEAPON_ATTACK: number;
  MAGIC_ATTACK: number;
  upgrade_avalable: number;
  max_upgrade: number;
  upgrade: number;
  max_star: number;
  star: number;
};

export type SlotType = {
  id: number;
};

export type InventoryState = {
  currInven: number;
  inventory: SlotType[][];
  invenEquip: EquipType[];
  currItem: EquipType;
};

export const initialState: InventoryState = {
  currInven: 0,
  inventory: new Array(4).fill(null).map(() => new Array(0).fill(null)),
  invenEquip: equips,
  currItem: emptyEquip,
};
