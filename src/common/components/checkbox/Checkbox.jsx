import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  wrapper: {
    position: 'relative',
  },
  root: {
    color: '#b7b3ce',
    '&$checked': {
      color: '#31e495',
    },
  },
  checked: {},
  error: {
    color: '#f44336',
    fontSize: '0.75rem',
    position: 'absolute',
    bottom: '-30px',
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
  },
}

const CheckBox = ({ input, label, classes, meta: { touched, invalid, error } }) => (
  <div className={classes.wrapper}>
    <div className={classes.container}>
      <FormControlLabel
        control={
          <Checkbox 
            checked={input.value ? true : false}
            onChange={input.onChange}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
          />
        }
        
      />
      {label}
    </div>
    {touched && error && invalid && <div style={styles.error}>{error}</div>}
  </div>
)

export default withStyles(styles)(CheckBox)