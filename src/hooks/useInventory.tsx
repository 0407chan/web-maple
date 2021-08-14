import { RootState } from "@/modules";
import { EquipType } from "@/modules/inventory";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { EquipType } from "../modules/item";
import {
  addEquip,
  deleteEquip,
  setCurrItem, setInvenEquip,
  setInvenEtc,
  setInvenSetup,
  setInvenUse
} from "../modules/inventory/reducer";


export default function useInventory() {
  const currInven = useSelector(
    (state: RootState) => state.inventory.currInven
  );
  const inventory = useSelector(
    (state: RootState) => state.inventory.inventory
  );
  const invenEquip = useSelector(
    (state: RootState) => state.inventory.invenEquip
  );
  const currItem = useSelector((state: RootState) => state.inventory.currItem);

  const dispatch = useDispatch();

  const onSetInvenEquip = useCallback(() => dispatch(setInvenEquip()), [
    dispatch,
  ]);
  const onSetInvenEtc = useCallback(() => dispatch(setInvenEtc()), [dispatch]);
  const onSetInvenSetup = useCallback(() => dispatch(setInvenSetup()), [
    dispatch,
  ]);
  const onSetInvenUse = useCallback(() => dispatch(setInvenUse()), [dispatch]);

  const onAddEquip = useCallback(
    (newItem: EquipType) => dispatch(addEquip(newItem)),
    [dispatch]
  );
  const onDeleteEquip = useCallback(
    (itemId: number) => dispatch(deleteEquip(itemId)),
    [dispatch]
  );

  const onSetCurrItem = useCallback(
    (item: EquipType) => dispatch(setCurrItem(item)),
    [dispatch]
  );

  return {
    currInven,
    inventory,
    invenEquip,
    currItem,
    onAddEquip,
    onDeleteEquip,
    onSetInvenEquip,
    onSetInvenEtc,
    onSetInvenSetup,
    onSetInvenUse,
    onSetCurrItem,
  };
}
