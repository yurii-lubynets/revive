import React, { Component } from 'react'

import Icon from '../../../common/components/icon/Icon'

import styles from '../UserContainer.module.css'


class Tooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTooltip: false,
    }
  }

  onToggleOpen = () => this.setState({ showTooltip: !this.state.showTooltip })

  render() {
    const { showTooltip } = this.state

    return(
      <div
        className={styles.registrationTooltip}
        onMouseOver={this.onToggleOpen}
        onMouseOut={this.onToggleOpen}
      >
        <div
          className={styles.registrationTooltipContainer}
          onMouseOver={this.onToggleOpen}
          onMouseOut={this.onToggleOpen}
        >
          {showTooltip && <div>Private</div>}
          <Icon name="private"/>
        </div>
      </div>
    )
  }
}


export default Tooltip