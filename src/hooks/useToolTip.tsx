import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { useCallback } from "react";
import {
  displayNone,
  displayVisible,
  setMousePosition,
} from "../modules/toolTip/reducer";

export default function useToolTip() {
  const visible = useSelector((state: RootState) => state.toolTip.visible);
  const mouseX = useSelector((state: RootState) => state.toolTip.mouseX);
  const mouseY = useSelector((state: RootState) => state.toolTip.mouseY);

  const dispatch = useDispatch();

  const setDisplayNone = useCallback(() => dispatch(displayNone()), [dispatch]);
  const setDisplayVisible = useCallback(() => dispatch(displayVisible()), [
    dispatch,
  ]);
  const onSetMousePosition = useCallback(
    (mouseX: number, mouseY: number) =>
      dispatch(setMousePosition(mouseX, mouseY)),
    [dispatch]
  );

  return {
    visible,
    mouseX,
    mouseY,
    setDisplayNone,
    setDisplayVisible,
    onSetMousePosition,
  };
}
