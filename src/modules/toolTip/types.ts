import {
  displayNone,
  displayVisible,
  setMousePosition,
} from "../toolTip/reducer";

export type ToolTipAction =
  | ReturnType<typeof displayNone>
  | ReturnType<typeof displayVisible>
  | ReturnType<typeof setMousePosition>;

export type ToolTipState = {
  visible: boolean;
  mouseX: number;
  mouseY: number;
};

export const initialState: ToolTipState = {
  visible: true,
  mouseX: 0,
  mouseY: 0,
};
