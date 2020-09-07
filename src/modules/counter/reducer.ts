import { INCREASE, DECREASE, INCREASE_BY } from "./actions";
import { CounterState, initialState, CounterAction } from "./types";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});

function counter(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
