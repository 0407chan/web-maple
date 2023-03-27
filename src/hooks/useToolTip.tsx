import {
  hidePrevTooltip,
  hideTooltip,
  setMousePosition,
  showPrevTooltip,
  showTooltip
} from 'feature/tooltip/tooltipSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { RootState } from 'redux/store'

const useToolTip = () => {
  const visible = useAppSelector(
    (state: RootState) => state.tooltipReducer.visible
  )
  const prevTooltip = useAppSelector(
    (state: RootState) => state.tooltipReducer.prevTooltip
  )
  const mouseX = useAppSelector(
    (state: RootState) => state.tooltipReducer.mouseX
  )
  const mouseY = useAppSelector(
    (state: RootState) => state.tooltipReducer.mouseY
  )

  const dispatch = useAppDispatch()

  const onShowTooltip = () => dispatch(showTooltip())
  const onHideTooltip = () => dispatch(hideTooltip())
  const onShowPrevTooltip = () => dispatch(showPrevTooltip())
  const onHidePrevTooltip = () => dispatch(hidePrevTooltip())
  const onSetMousePosition = (mouseX: number, mouseY: number) =>
    dispatch(setMousePosition({ mouseX, mouseY }))

  return {
    visible,
    prevTooltip,
    mouseX,
    mouseY,
    onShowPrevTooltip,
    onHidePrevTooltip,
    onShowTooltip,
    onHideTooltip,
    onSetMousePosition
  }
}

export default useToolTip
