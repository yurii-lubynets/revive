import React from 'react'
// import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import { FormControlLabel } from '@material-ui/core'

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })(props => <Radio color="default" {...props} />)

const RadioButton = ({ selectedValue, item, handleChange, className }) => 
  <FormControlLabel
    className={className}
    value="top"
    control={
      <Radio
        checked={selectedValue === item.value}
        onChange={handleChange}
        value={item.value}
        color="default"
        name={item.label}
        // inputProps={{ 'aria-label': 'D' }}
      />
    }
    label={item.label}
    labelPlacement="end"
  />

export default RadioButton