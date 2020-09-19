import { SET_INVEN_EQUIP } from "./actions";
import {
  InventoryState,
  initialState,
  InventoryAction,
  EquipType,
} from "./types";

export const setInvenEquip = () => ({ type: SET_INVEN_EQUIP });
function inventory(
  state: InventoryState = initialState,
  action: InventoryAction
) {
  switch (action.type) {
    case SET_INVEN_EQUIP:
      return { ...state, currInven: 0 };
    default:
      return state;
  }
}

export default inventory;
