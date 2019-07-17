import React, { Component } from 'react'

import RadioButton from '../../../common/components/radio/RadioButton'
import Tooltip from '../utils/Tooltip'
import styles from '../UserContainer.module.css'


class RadioButtonField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: '',
    }
  }

  render() {
    const { selectedValue } = this.state
    const { setFieldValue, field, label, form, options } = this.props
    const error = form.touched[field.name] && form.errors[field.name]

    return(
      <div className={styles.radioButtonContainer}>
        <div className={styles.label}>{label}<Tooltip/></div>
        {options.map((item, index) =>
          <RadioButton
            className={styles.radio}
            key={index}
            item={item}
            selectedValue={selectedValue}
            handleChange={() => { setFieldValue(field.name, item.value); this.setState({ selectedValue: item.value }) }} 
          /> )}
        {Boolean(error) && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}


export default RadioButtonField