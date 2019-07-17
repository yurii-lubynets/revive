import React, { Component } from 'react'

import Select from 'react-select'

import { Control } from '../../../common/components/textbox/TextBoxFormik'

import styles from '../UserContainer.module.css'

const customStyles = {
  dropdownIndicator: (provided, state) => ({
    color: state.isFocused ? '#454452' : '#858297',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuList: () => ({ padding: '0' }),
  menu: () => ({
    border: '1px solid #b7b3ce',
    borderRadius: '0',
    marginTop: '10px',
    position: 'absolute',
    width: '100%',
    background: '#fff',
    zIndex: '5',
    maxHeight: '200px',
    overflowY: 'scroll',
  }),
  option: (provided, state) => ({
    borderBottom: '1px solid #b7b3ce',
    fontSize: '16px',
    lineHeight: '19.1px',
    letterSpacing: '.64px',
    color: state.isSelected || state.isFocused  ? '#31e495' : '#454452',
    padding: '15px 20px',
    backgroundColor: state.isSelected || state.isFocused && 'none', 
    cursor: state.isSelected || state.isFocused && 'pointer',
  }),
}

class TitleDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shrink: !!this.props.field.value,
    }
  }

  render() {
    const { setFieldValue, field, label, form, options } = this.props

    const defaultOption = {
      value: field.value || '',
      label: field.value,
    }
    const textFieldProps = {
      label,
      InputLabelProps: this.state.shrink ? { shrink: true } : {},
      helperText: form.touched[field.name] && form.errors[field.name],
      error: Boolean(form.touched[field.name] && form.errors[field.name]),
    }

    return(
      <Select
        isSearchable={false}
        className={styles.DropdownContainer}
        placeholder
        textFieldProps={textFieldProps}
        defaultValue={defaultOption}
        name={field.name}
        options={options}
        components={{ Control }}
        styles={customStyles}
        onChange={ optionSelected => {setFieldValue(`${field.name}`, optionSelected.value); this.setState({ shrink: true })} }
      />
    )
  }
}


export default TitleDropdown