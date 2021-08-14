import {
  ADD_EQUIP,
  DELETE_EQUIP,
  SET_CURR_ITEM, SET_INVEN_EQUIP,

  SET_INVEN_ETC,
  SET_INVEN_SETUP, SET_INVEN_USE
} from "./actions";
import {
  EquipType, initialState,
  InventoryAction, InventoryState
} from "./types";

export const setInvenEquip = () => ({ type: SET_INVEN_EQUIP });
export const setInvenUse = () => ({ type: SET_INVEN_USE });
export const setInvenEtc = () => ({ type: SET_INVEN_ETC });
export const setInvenSetup = () => ({ type: SET_INVEN_SETUP });

export const addEquip = (item: EquipType) => ({ type: ADD_EQUIP, item });
export const deleteEquip = (itemId: number) => ({ type: DELETE_EQUIP, itemId });

export const setCurrItem = (item: EquipType) => ({ type: SET_CURR_ITEM, item });

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
      state.invenEquip.push(action.item);
      return {
        ...state,
        invenEquip: [...state.invenEquip],
      };
    case DELETE_EQUIP:
      return { ...state, currInven: 3 };
    case SET_CURR_ITEM:
      return { ...state, currItem: action.item };
    default:
      return state;
  }
}

export default inventory;
