import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Field } from 'redux-form'

import TextField from '@material-ui/core/TextField'

import ShowPassword from '../icon/ShowPassword'
import HidePassword from '../icon/HidePassword'
 
import ScreenClassRender from '../../../util/ScreenClassRender'

import styles from './TextBox.module.css'


const RenderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) =>(
  <TextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    inputProps={ !input.name.includes('password') ? { maxLength: 40 } : undefined}
    FormHelperTextProps={{
      classes:{
        error: styles.error,
      },
    }}
  />
)

class TextBoxSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
    }
  }

  render() {
    const { name, type, label, value, validate, disabled } = this.props
    const { showPassword } = this.state

    const passwordClassNames = () => classNames.bind(styles)({
      password: type === TextBoxType.PASSWORD,
    })
    const inputType = () => {
      if (type === TextBoxType.PASSWORD) {
        return showPassword ? TextBoxType.TEXT : TextBoxType.PASSWORD
      } else {
        return type
      }
    }
    
    return(
      <div className={passwordClassNames()}>
        <Field
          name={name}
          type={inputType()}
          label={label}
          placeholder=""
          component={RenderTextField}
          value={value}
          validate={validate}
          disabled={disabled}
          className={styles.input}
        />
        {(type === TextBoxType.PASSWORD) && (
          <button type="button" className={styles.toggleVisibility} onClick={()=>this.setState({ showPassword: !showPassword })}>
            {showPassword ? (<ShowPassword/>) : (<HidePassword/>)}
          </button>
        )}
      </div>
    )
  }
}

export const TextBoxType = {
  TEXT: 'text',
  NUMBER: 'number',
  PASSWORD: 'password',
  EMAIL: 'email',
}

TextBoxSection.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    TextBoxType.TEXT,
    TextBoxType.NUMBER,
    TextBoxType.PASSWORD,
    TextBoxType.EMAIL,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]).isRequired,
  disabled: PropTypes.bool,
}

TextBoxSection.defaultProps = {
  type: TextBoxType.TEXT,
  disabled: false,
  label: 'label',
  placeholder: 'placeholder',
}

const TextBox = ScreenClassRender(TextBoxSection)

export default TextBox