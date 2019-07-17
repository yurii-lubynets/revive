import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

import { Control } from '../textbox/TextBoxFormik'

import styles1 from './Autocomplete.module.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  menu: {
    position: 'absolute',
    zIndex: 5,
    left: 0,
    right: 0,
    maxHeight: '200px',
    overflowY: 'scroll',
  },
})

const NoOptionsMessage = ({ selectProps, innerProps, children }) =>
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>

NoOptionsMessage.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
}

const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) =>
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>

Option.propTypes = {
  innerRef: PropTypes.func,
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  innerProps: PropTypes.object,
  children: PropTypes.node,
}

const Placeholder = ({ selectProps, innerProps, children }) =>
  <Typography
    color="textSecondary"
    className={selectProps.classes.placeholder}
    {...innerProps}
  >
    {children}
  </Typography>

Placeholder.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
}

const SingleValue = ({ selectProps, innerProps, children }) => 
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>

SingleValue.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
}

const ValueContainer = ({ selectProps, children }) =>
  <div className={selectProps.classes.valueContainer}>{children}</div>

ValueContainer.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.node,
}

const MultiValue = ({ selectProps, children, isFocused, removeProps }) =>
  <Chip
    tabIndex={-1}
    label={children}
    className={classNames(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused,
    })}
    onDelete={event => {
      removeProps.onClick()
      removeProps.onMouseDown(event)
    }}
  />

MultiValue.propTypes = {
  selectProps: PropTypes.object,
  isFocused: PropTypes.bool,
  children: PropTypes.node,
  removeProps: PropTypes.object,
}

const Menu = ({ selectProps, innerProps, children }) => 
  <Paper square className={selectProps.classes.menu} {...innerProps}>
    {children}
  </Paper>

Menu.propTypes = {
  selectProps: PropTypes.object,
  innerProps: PropTypes.object,
  children: PropTypes.node,
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
}
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
    zIndex: 5,
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

class Autocomplete extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shrink: !!this.props.field.value,
      value: '',
    }
  }
  render() {
    const { shrink, value } = this.state
    const { handleChange, required, classes, theme, label, field, form: { touched, errors, values, setFieldValue }, options, isMultiple, ...other } = this.props
    const hasError = touched[field.name] && errors[field.name]

    return (
      <div className={classes.root}>
        <FormControl error={Boolean(hasError)} required={required} {...other}>
          <Select
            placeholder=""
            className={styles1.autoComplete}
            classes={classes}
            styles={customStyles}
            required={required}
            textFieldProps={{
              required,
              label,
              error: Boolean(hasError),
              InputLabelProps: {
                shrink,
              },
            }}
            options={options}
            components={components}
            onChange={value => { handleChange(value); setFieldValue(field.name, value); this.setState({ shrink: true, value }) }}
            onMenuOpen={() => this.setState({ shrink: true })}
            onMenuClose={() => !value && this.setState({ shrink: false })}
            value={values[field.name]}
            isMulti={isMultiple}
          />
          {Boolean(hasError) && <FormHelperText>{errors[field.name]}</FormHelperText>}
        </FormControl>
      </div>
    )
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  label: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  isMultiple: PropTypes.bool,
}

Autocomplete.defaultProps = {
  required: false,
  fullWidth: true,
  margin: 'normal',
  isMultiple: true,
}

export default withStyles(styles, { withTheme: true })(Autocomplete)