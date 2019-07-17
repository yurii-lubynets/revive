import React, { Component } from 'react'
import classNames from 'classnames/bind'

import { isMobile } from '../../../util/responsive'
import screenClassRender from '../../../util/ScreenClassRender'

import styles from './Dropdown.module.css'

class Dropdown extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  onClick = () => this.setState({ showMenu: !this.state.showMenu })

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showMenu: false })
    }
  }

  render() {
    const { classNameMenu, value, children, screen } = this.props
    const { showMenu } = this.state

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onClick: this.onClick })
    )

    return (
      <div
        ref={node => this.wrapperRef = node}
        className={classNames.bind(styles)(styles.dropdownContainer, {
          dropdownContainer: isMobile(screen),
        })}>
        <span className={styles.value} onClick={this.onClick}>{value}</span>
        {showMenu && (
          <div className={classNames.bind(styles)(classNameMenu, styles.menu)}>
            <div className={styles.menuContainer}>
              { childrenWithProps }
            </div>
          </div>)}
      </div>
    )
  }
}

export default screenClassRender(Dropdown)