import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import PhoneInput from 'react-phone-number-input/react-responsive-ui'
import Select from 'react-responsive-ui/commonjs/Select'

import styles from './PhoneInput.module.css'

import 'react-phone-number-input/style.css'
import 'react-responsive-ui/style.css'


class CountrySelect extends Component {
  static defaultProps = {
    saveOnIcons: true,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func,
  }

  render() {
    const {
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      options,
      disabled,
      tabIndex,
      saveOnIcons,
      scrollMaxItems,
      toggleClassName,
    }
		= this.props

    return (
      <Select
        icon
        name={ name }
        value={ value }
        onChange={ onChange }
        onFocus={ onFocus }
        onBlur={ onBlur }
        options={ options }
        disabled={ disabled }
        tabIndex={ tabIndex }
        className={styles.select}
        aria-label={ this.props['aria-label'] }
        saveOnIcons={ saveOnIcons }
        scrollMaxItems={ scrollMaxItems }
        toggleClassName={ toggleClassName }/>
    )
  }
}

class Phone extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { field, label, form } = this.props
    const defaultNumber = field && field.value && field.value.startsWith('+') ? field.value : `+${field.value}`
    const onChange = value => {
      if (!form.touched[field.name]) form.setFieldTouched(field.name)
      form.setFieldValue(field.name, value)
    }
    return <div className={classNames.bind(styles)(styles.phoneContainer, { 
      phoneError: form && form.errors && form.errors.phone && form.touched[field.name],
    })}>
      <PhoneInput
        country=""
        className={styles.phoneInput}
        placeholder={label}
        value={defaultNumber}
        onChange={onChange}
        countrySelectComponent={CountrySelect}
      />
      <div className={styles.error}>{form && form.errors && form.touched[field.name] && form.errors.phone}</div>
    </div>
  }
}

export default Phone