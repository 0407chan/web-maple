import { Checkbox as OriginalCheckbox, CheckboxProps } from 'antd/lib'
import React from 'react'

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return <OriginalCheckbox {...props}></OriginalCheckbox>
}

export default Checkbox
