import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Button, { ButtonType } from '../../../common/components/button/Button'

import styles from './HeaderStyles.module.css'

class HeaderDesktop extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { intl } = this.context
    const { loginState: { user, isAuthenticated } } = this.props
    
    const Links = [
      {
        name: `${intl.formatMessage({ id: 'page.home.becomeSP' })}`,
        path: '/account/join-sp',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.contactUs' })}`,
        path: '/contact-us',
      },
    ]

    return (
      <Fragment>
        {isAuthenticated
          ? <Fragment>
            {[Links.pop()].map((item, index) => 
              <Button
                key={index}
                path={item.path}
                className={styles.Button}
                value={item.name}
                type={ButtonType.LINK}
              />
            )}
          </Fragment>
          : <Fragment>
            {Links.map((item, index) => 
              <Button
                key={index}
                path={item.path}
                className={styles.Button}
                value={item.name}
                type={ButtonType.LINK}
              />
            )}
            <Button
              className={styles.ButtonLink}
              value={intl.formatMessage({ id: 'page.home.join' })}
              type={ButtonType.LINK}
              path="/account/join"    
            />
            <Button
              className={styles.ButtonLink}
              value={intl.formatMessage({ id: 'page.home.login' })}
              type={ButtonType.LINK}
              path="/account/login"    
            />
          </Fragment>}
      </Fragment>
    )
  }
}
HeaderDesktop.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default HeaderDesktop