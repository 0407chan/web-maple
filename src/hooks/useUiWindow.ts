import { addUiWindow, removeUiWindow } from '@/feature/uiWindow/uiWindowSlice'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

export default function useUiWindow() {
  const dispatch = useDispatch()
  const uiWindowList = useSelector(
    (state: RootState) => state.uiWindow.uiWindowList
  )

  const onRemoveUiWindow = (windowName: string) =>
    dispatch(removeUiWindow({ windowName }))
  const onAddUiWindow = (windowName: string) =>
    dispatch(addUiWindow({ windowName }))
  const onRemoveLastWindow = () => {
    const lastWindow = Array.from(uiWindowList).pop()
    if (lastWindow) {
      dispatch(removeUiWindow({ windowName: lastWindow }))
    }
  }

  return {
    uiWindowList,
    onRemoveUiWindow,
    onAddUiWindow,
    onRemoveLastWindow
  }
}
