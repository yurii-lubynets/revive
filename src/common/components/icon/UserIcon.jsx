import React from 'react'
import PropTypes from 'prop-types'

const UserIcon = ({ width, height, color, className }) => (
  <svg className={className} width={width} height={height} fill="none" viewBox="0 0 30 30">
    <path fill={color} fillRule="evenodd" d="M15 18c2.982 0 5.4-2.686 5.4-6S17.982 6 15 6s-5.4 2.686-5.4 6 2.418 6 5.4 6zm0-2.4c1.657 0 3-1.612 3-3.6s-1.343-3.6-3-3.6-3 1.612-3 3.6 1.343 3.6 3 3.6z" clipRule="evenodd"/>
    <path fill={color} fillRule="evenodd" d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm0-2.4c6.959 0 12.6-5.641 12.6-12.6S21.959 2.4 15 2.4 2.4 8.041 2.4 15 8.041 27.6 15 27.6z" clipRule="evenodd"/>
    <path fill={color} d="M4.138 23.855A14.957 14.957 0 0 1 15 19.2c4.628 0 8.766 2.096 11.518 5.39l-.118.01-1.846 1.385A12.571 12.571 0 0 0 15 21.6c-3.54 0-6.737 1.46-9.026 3.809l-1.836-1.554z"/>
  </svg>
)

UserIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
}

UserIcon.defaultProps = {
  width: 30,
  height: 30,
  color: '#31E495',
  className: '',
}

export default UserIcon