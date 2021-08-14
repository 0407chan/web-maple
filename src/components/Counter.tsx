import useCounter from "@/hooks/useCounter";
import React from "react";
function Counter() {
  const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();
  return (
    <div>
      <div>{count}</div>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
