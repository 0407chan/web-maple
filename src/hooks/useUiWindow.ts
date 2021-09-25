import {
  addUiWindow,
  removeUiWindow,
  setTop,
  UiWindowType
} from '@/feature/uiWindow/uiWindowSlice'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

const useUiWindow = () => {
  const dispatch = useDispatch()
  const uiWindowList = useSelector(
    (state: RootState) => state.uiWindow.uiWindowList
  )

  const onRemoveUiWindow = (windowName: UiWindowType) =>
    dispatch(removeUiWindow({ windowName }))

  const onAddUiWindow = (windowName: UiWindowType) => {
    dispatch(addUiWindow({ windowName }))
    dispatch(setTop({ windowName }))
  }

  const onSetTop = (windowName: UiWindowType) => {
    dispatch(setTop({ windowName }))
  }

  const onRemoveLastWindow = () => {
    const lastWindow = Array.from(uiWindowList).pop()
    if (lastWindow) {
      dispatch(removeUiWindow({ windowName: lastWindow }))
    }
  }
  const isOpenedWindow = (windowName: UiWindowType) => {
    return uiWindowList.find((value) => value === windowName)
  }

  return {
    uiWindowList,
    onRemoveUiWindow,
    onAddUiWindow,
    onRemoveLastWindow,
    isOpenedWindow,
    onSetTop
  }
}

export default useUiWindow
