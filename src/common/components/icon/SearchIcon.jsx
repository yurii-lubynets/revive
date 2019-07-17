import React from 'react'
import PropTypes from 'prop-types'

const SearchIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 20 20">
    <path
      fill={color}
      fillRule="evenodd"
      d="M12.712 12.063l-.256-.247a5.92 5.92 0 0 0 1.437-3.87 5.946 5.946 0 1 0-5.947 5.947 5.92 5.92 0 0 0 3.87-1.437l.247.256v.723l4.013 4.005c.31.31.81.31 1.131-.01l.223-.223a.808.808 0 0 0 .01-1.13l-4.005-4.014h-.723zM3.83 7.946A4.111 4.111 0 0 1 7.946 3.83a4.111 4.111 0 0 1 4.117 4.116 4.111 4.111 0 0 1-4.117 4.117A4.111 4.111 0 0 1 3.83 7.946z"
    />
  </svg>
)

SearchIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}

SearchIcon.defaultProps = {
  width: 20,
  height: 20,
  color: '#fff',
}

export default SearchIcon