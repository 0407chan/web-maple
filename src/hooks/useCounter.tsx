import {
  decrement,
  increment,
  incrementByAmount
} from 'feature/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'

export default function useCounter() {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()

  const onIncrease = () => dispatch(increment())
  const onDecrease = () => dispatch(decrement())
  const onIncreaseBy = (diff: number) => dispatch(incrementByAmount(diff))

  return {
    count,
    onIncrease,
    onDecrease,
    onIncreaseBy
  }
}
