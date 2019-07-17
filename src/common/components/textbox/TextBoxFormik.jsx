import React from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames/bind'

import Tooltip from '../../../page/user/utils/Tooltip'

import styles from './TextBox.module.css'


const RenderTextField = ({ withTooltip, field: { value, ...fields }, form: { touched, errors, ...rest }, className, requiredStar, phoneCodeError, phoneCodeTouched, ...props }) => withTooltip
  ? <div style={{ position: 'relative' }}>
    <Tooltip/>
    <TextField
      {...props}
      {...fields}
      value={value}
      required={requiredStar}
      error={Boolean(touched[fields.name] && errors[fields.name])}
      helperText={touched[fields.name] && errors[fields.name]}
      className={classNames.bind(styles)(styles.input, className)}
      defaultValue={rest.values[props.name]}
      inputProps={{ maxLength: 140 }}
      FormHelperTextProps={{
        classes:{
          error: styles.error,
        },
      }}
    /> 
  </div>
  : <TextField
    {...props}
    {...fields}
    value={value}
    required={requiredStar}
    error={Boolean(touched[fields.name] && errors[fields.name])}
    helperText={touched[fields.name] && errors[fields.name]}
    className={classNames.bind(styles)(styles.input, className)}
    defaultValue={rest.values[props.name]}
    inputProps={{ maxLength: 140 }}
    FormHelperTextProps={{
      classes:{
        error: styles.error,
      },
    }}
  />
      

export default RenderTextField

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props}/>

export const Control = props => {
  return(
    <TextField
      className={styles.input}
      InputProps={{
        inputComponent,
        inputProps: {
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

export const TextArea = ({ field: { value, ...fields }, form: { touched, errors, ...rest }, classes, ...props }) => 
  <TextField
    {...props}
    {...fields}
    value={value}
    error={Boolean(touched[fields.name] && errors[fields.name])}
    helperText={touched[fields.name] && errors[fields.name]}
    className={styles.input}
    defaultValue={rest.values[props.name]}
    multiline
    FormHelperTextProps={{
      classes:{
        error: styles.errorTextArea,
      },
    }}
  />
