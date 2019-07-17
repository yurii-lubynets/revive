import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Delayed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden : true,
    }
  }

  componentDidMount() {
    this.delay = setTimeout(() => {
      this.setState({ hidden: false })
    }, this.props.waitBeforeShow)
  }
  componentWillUnmount() {
    clearTimeout(this.delay)
  }
  render() {
    return this.state.hidden ? '' : this.props.children
  }
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired, 
}

export default Delayed