import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Button.module.css'

const Button = ({ className, type, path, handleClick, disabled, submit, value, href, icon, location }) => {
  const buttonClassNames = () => classNames.bind(styles)(styles.button, className, {
    primary: type === ButtonType.PRIMARY,
    secondary: type === ButtonType.SECONDARY,
    link: type === ButtonType.LINK,
    confirmation: type === ButtonType.CONFIRMATION,
  })

  const renderFragment = () => (
    <Fragment>
      {icon}
      <p className={styles.value}>{value}</p>
    </Fragment>
  )

  return path
    ? <Link className={buttonClassNames()} to={{ pathname: path, prevPathname: location }} onClick={handleClick}>
      {renderFragment()}
    </Link>
    : href 
      ? <a onClick={handleClick} className={buttonClassNames()} href={href}>{renderFragment()}</a>
      : <button
        onClick={handleClick}
        disabled={disabled}
        type={submit ? 'submit' : 'button'}
        className={buttonClassNames()}
      >
        {renderFragment()}
      </button>
}

export const ButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LINK: 'link',
  CONFIRMATION: 'confirmation',
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    ButtonType.PRIMARY,
    ButtonType.SECONDARY,
    ButtonType.LINK,
    ButtonType.CONFIRMATION,
  ]),
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
}

Button.defaultProps = {
  className: '',
  type: ButtonType.PRIMARY,
  disabled: false,
  submit: false,
}

export default Button