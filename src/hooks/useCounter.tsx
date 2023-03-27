import {
  decrement,
  increment,
  incrementByAmount
} from 'feature/counter/counterSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'

export default function useCounter() {
  const count = useAppSelector((state: RootState) => state.counterReducer.count)
  const dispatch = useAppDispatch()

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
