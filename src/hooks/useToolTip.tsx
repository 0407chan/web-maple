import {
  hideTooltip,
  setMousePosition,
  showTooltip
} from '@/feature/tooltip/tooltipSlice'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'

const useToolTip = () => {
  const visible = useSelector((state: RootState) => state.tooltip.visible)
  const mouseX = useSelector((state: RootState) => state.tooltip.mouseX)
  const mouseY = useSelector((state: RootState) => state.tooltip.mouseY)

  const dispatch = useDispatch()

  const onShowTooltip = () => dispatch(showTooltip())
  const onHideTooltip = () => dispatch(hideTooltip())
  const onSetMousePosition = (mouseX: number, mouseY: number) =>
    dispatch(setMousePosition({ mouseX, mouseY }))

  return {
    visible,
    mouseX,
    mouseY,
    onShowTooltip,
    onHideTooltip,
    onSetMousePosition
  }
}

export default useToolTip
