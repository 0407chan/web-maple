import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { useCallback } from "react";
import {
  setInvenEquip,
  setInvenEtc,
  setInvenSetup,
  setInvenUse,
  addEquip,
  deleteEquip,
} from "../modules/inventory/reducer";

import { EquipType } from "../modules/inventory/types";

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

  return {
    currInven,
    inventory,
    invenEquip,
    onAddEquip,
    onDeleteEquip,
    onSetInvenEquip,
    onSetInvenEtc,
    onSetInvenSetup,
    onSetInvenUse,
  };
}
