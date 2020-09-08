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

export default function useInventory() {
  const currInven = useSelector(
    (state: RootState) => state.inventory.currInven
  );
  const inventory = useSelector(
    (state: RootState) => state.inventory.inventory
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

  return {
    currInven,
    inventory,
    onSetInvenEquip,
    onSetInvenEtc,
    onSetInvenSetup,
    onSetInvenUse,
  };
}
