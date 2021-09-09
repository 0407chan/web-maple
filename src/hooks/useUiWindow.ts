import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

export default function useUiWindow() {
  const dispatch = useDispatch()
  const uiWindowList = useSelector(
    (state: RootState) => state.uiWindow.uiWindowList
  )

  return {
    uiWindowList
  }
}
