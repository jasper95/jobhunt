import React, { useCallback, useState } from 'react'
import CreatableSelect from 'react-select/lib/Creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
})

function CreatableInput(props) {
  const { onChange, value: propsValue } = props
  const [value, setValue] = useState(propsValue)
  const [inputValue, setInputValue] = useState('')
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!value.map(e => e.value).includes(inputValue)) {
          const newValue = [...value, createOption(inputValue)]
          setValue(newValue)
          onChange(newValue)
          setInputValue('')
        }
        event.preventDefault();
    }
  }
  const handleChange = (newValue) => {
    setValue(newValue)
    onChange(newValue)
  }
  const handleInputChange = (newValue) => {
    setInputValue(newValue)
  }
  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
  )
}

CreatableInput.defaultProps = {
  onChange: () => {},
  value: []
}

export default CreatableInput