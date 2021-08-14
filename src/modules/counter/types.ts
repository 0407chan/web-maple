import { decrease, increase, increaseBy } from "./reducer";

export type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

export type CounterState = {
  count: number;
};

export const initialState: CounterState = {
  count: 0,
};
