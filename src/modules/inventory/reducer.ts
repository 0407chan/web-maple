import {
  SET_INVEN_EQUIP,
  SET_INVEN_USE,
  SET_INVEN_ETC,
  SET_INVEN_SETUP,
  ADD_EQUIP,
  DELETE_EQUIP,
} from "./actions";
import {
  InventoryState,
  initialState,
  InventoryAction,
  EquipType,
} from "./types";

export const setInvenEquip = () => ({ type: SET_INVEN_EQUIP });
export const setInvenUse = () => ({ type: SET_INVEN_USE });
export const setInvenEtc = () => ({ type: SET_INVEN_ETC });
export const setInvenSetup = () => ({ type: SET_INVEN_SETUP });

export const addEquip = (item: EquipType) => ({ type: ADD_EQUIP, item });
export const deleteEquip = (itemId: number) => ({ type: DELETE_EQUIP, itemId });

function inventory(
  state: InventoryState = initialState,
  action: InventoryAction
) {
  switch (action.type) {
    case SET_INVEN_EQUIP:
      return { ...state, currInven: 0 };
    case SET_INVEN_USE:
      return { ...state, currInven: 1 };
    case SET_INVEN_ETC:
      return { ...state, currInven: 2 };
    case SET_INVEN_SETUP:
      return { ...state, currInven: 3 };
    case ADD_EQUIP:
      return {
        ...state,
        invenEquip: state.invenEquip.push(action.item),
      };
    case DELETE_EQUIP:
      return { ...state, currInven: 3 };
    default:
      return state;
  }
}

export default inventory;
