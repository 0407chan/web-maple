import { UiWindowType } from '@/feature/uiWindow/uiWindowSlice'
import useUiWindow from '@/hooks/useUiWindow'
import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'
import Draggable, {
  ControlPosition,
  DraggableEventHandler
} from 'react-draggable'
import * as S from './style'

type props = {
  windowType: UiWindowType
  title?: string
  footer?: React.ReactNode
  style?: React.CSSProperties
  canDrag?: boolean
  position?: ControlPosition
  onDrag?: DraggableEventHandler | undefined
  hideCloseButton?: boolean
}
const WindowContainer: React.FC<props> = ({
  windowType,
  title,
  footer,
  style,
  canDrag = true,
  position,
  onDrag = undefined,
  hideCloseButton = false,
  children
}) => {
  const { isOpenedWindow, uiWindowList, onSetTop, onRemoveUiWindow } =
    useUiWindow()

  const { isMobile } = useWindowSize()
  const removeUiWindow = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onRemoveUiWindow(windowType)
  }

  if (!isOpenedWindow(windowType)) return null
  return (
    <Draggable
      handle=".handle"
      bounds={isMobile() ? undefined : 'body'}
      onDrag={onDrag}
      position={position}
    >
      <S.Contianer
        className="no-drag"
        style={{
          ...style,
          zIndex:
            uiWindowList[uiWindowList.length - 1] === windowType ? 1 : undefined
        }}
        onClick={() => onSetTop(windowType)}
      >
        <S.Header className={canDrag ? 'handle' : ''}>{title || ''}</S.Header>
        {!hideCloseButton && (
          <S.CloseButton onClick={removeUiWindow}>✖</S.CloseButton>
        )}
        <S.Body>{children}</S.Body>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Contianer>
    </Draggable>
  )
}

export default WindowContainer
