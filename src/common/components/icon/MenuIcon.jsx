import React from 'react'
import PropTypes from 'prop-types'

const MenuIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 26 20" fill="#fff">
    <path d="M0 1C0 0.447715 0.447715 0 1 0H25C25.5523 0 26 0.447715 26 1C26 1.55228 25.5523 2 25 2H1C0.447716 2 0 1.55228 0 1Z" fill={color}/>
    <path d="M0 10C0 9.44772 0.447715 9 1 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H1C0.447716 11 0 10.5523 0 10Z" fill={color}/>
    <path d="M0 19C0 18.4477 0.447715 18 1 18H25C25.5523 18 26 18.4477 26 19C26 19.5523 25.5523 20 25 20H1C0.447716 20 0 19.5523 0 19Z" fill={color}/>
  </svg>
)

MenuIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}

MenuIcon.defaultProps = {
  width: 20,
  height: 20,
  color: '#fff',
}

export default MenuIcon