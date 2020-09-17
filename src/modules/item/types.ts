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
  job: string;
  classify: string;
  name: string;
  image: string;
  STR: number;
  DEX: number;
  INT: number;
  LUK: number;
  baseStr: number;
  baseDex: number;
  baseInt: number;
  baseLuk: number;
  chuStr: number;
  chuDex: number;
  chuInt: number;
  chuLuk: number;
  addStr: number;
  addDex: number;
  addInt: number;
  addLuk: number;

  MaxHP: number;
  baseHP: number;
  chuHP: number;
  addHP: number;
  MaxMP: number;
  baseMP: number;
  chuMP: number;
  addMP: number;
  WEAPON_ATTACK: number;
  baseWA: number;
  chuWA: number;
  addWA: number;
  MAGIC_ATTACK: number;
  baseMA: number;
  chuMA: number;
  addMA: number;
  allStat: number;
  baseAllStat: number;
  chuAllStat: number;
  addAllStat: number;
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
};

export const initialState: InventoryState = {
  currInven: 0,
  inventory: new Array(4).fill(null).map(() => new Array(0).fill(null)),
};
