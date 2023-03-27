import {
  addUiWindow,
  removeUiWindow,
  setTop,
  UiWindowType
} from 'feature/uiWindow/uiWindowSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'

const useUiWindow = () => {
  const dispatch = useAppDispatch()
  const uiWindowList = useAppSelector(
    (state: RootState) => state.uiWindowReducer.uiWindowList
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

  const onToggleWindow = (windowName: UiWindowType) => {
    if (isOpenedWindow(windowName)) {
      onRemoveUiWindow(windowName)
    } else {
      onAddUiWindow(windowName)
    }
  }

  return {
    uiWindowList,
    onRemoveUiWindow,
    onAddUiWindow,
    onRemoveLastWindow,
    isOpenedWindow,
    onSetTop,
    onToggleWindow
  }
}

export default useUiWindow
