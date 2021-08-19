import {
  hidePrevTooltip,
  hideTooltip,
  setMousePosition,
  showPrevTooltip,
  showTooltip
} from '@/feature/tooltip/tooltipSlice'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

const useToolTip = () => {
  const visible = useSelector((state: RootState) => state.tooltip.visible)
  const prevTooltip = useSelector(
    (state: RootState) => state.tooltip.prevTooltip
  )
  const mouseX = useSelector((state: RootState) => state.tooltip.mouseX)
  const mouseY = useSelector((state: RootState) => state.tooltip.mouseY)

  const dispatch = useDispatch()

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
