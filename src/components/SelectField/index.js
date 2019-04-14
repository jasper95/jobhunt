import React from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function SelectField(props) {
  const { menus, itemLabel, itemValue, ...restProps } = props
  const menuItems = menus
    .map(e => {
      if (typeof e === 'string') {
        return {
          label: e,
          value: e
        }
      }
      const { [itemLabel]: label, [itemValue]: value } = e
      return { label, value }
    })
    .map(({ label, value }) => (
      <MenuItem key={value} value={value} children={label} />
    ))
  return (
    <TextField 
      {...restProps}
      children={menuItems}
      select
    />
  )
}

SelectField.defaultProps = {
  itemLabel: 'label',
  itemValue: 'value'
}