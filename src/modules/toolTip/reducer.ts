import {
  DISPLAY_NONE,
  DISPLAY_VISIBLE,
  MOUSE_POSITION,
} from "../toolTip/actions";
import { ToolTipState, initialState, ToolTipAction } from "../toolTip/types";

export const displayNone = () => ({ type: DISPLAY_NONE });
export const displayVisible = () => ({ type: DISPLAY_VISIBLE });
export const setMousePosition = (mouseX: number, mouseY: number) => ({
  type: MOUSE_POSITION,
  mouseX,
  mouseY,
});

function toolTip(state: ToolTipState = initialState, action: ToolTipAction) {
  switch (action.type) {
    case DISPLAY_NONE:
      return { ...state, visible: false };
    case DISPLAY_VISIBLE:
      return { ...state, visible: true };
    case MOUSE_POSITION:
      return { ...state, mouseX: action.mouseX, mouseY: action.mouseY };
    default:
      return state;
  }
}

export default toolTip;
