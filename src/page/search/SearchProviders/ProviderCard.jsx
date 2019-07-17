import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import Button, { ButtonType } from '../../../common/components/button/Button'

import screenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'

import styles from './SearchProvidersPage.module.css'

class ProviderCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    const { intl } = this.context
    const { screen, handleClick, isAuthenticated, user, provider: { providerId, logoImg, providerName, providerType, countries, visaTypes, userId } } = this.props

    return (
      <div className={classNames.bind(styles)(styles.cardContainer, { 
        cardContainerMobile: isMobile(screen),
      })}>
        <section className={styles.providerHeader}>
          <div className={styles.providerPhoto} style={ { backgroundImage: `url(${logoImg})` } }></div>
        </section>
        <section className={styles.providerInfo}>
          <div>
            <div className={styles.providerName}>{providerName}</div>
            <div className={styles.providerType}>{providerType}</div>
          </div>
          <Button
            path={`/provider/${providerId}`}
            value={intl.formatMessage({ id: 'page.search.details' })}
            type={ButtonType.LINK}
            className={styles.details}
          />
        </section>
        <section className={styles.props}>
          <div>
            <label>{intl.formatMessage({ id: 'page.search.country' })}</label>
            <div>{countries.map(item => item.countryName).join(', ')}</div>
          </div>
          <div>
            <label>{intl.formatMessage({ id: 'page.search.visas' })}</label>
            <div>{visaTypes.map(item => item.typeName).join(', ')}</div>
          </div>
        </section>
        <Button
          path={isAuthenticated && userId && `/user/chat/${userId}`}
          handleClick={handleClick}
          className={styles.Button}
          value={intl.formatMessage({ id: 'page.search.contact' })}
          type={ButtonType.PRIMARY}
        />
      </div>
    )
  }
}

ProviderCard.contextTypes = {
  intl: PropTypes.object.isRequired,
}

export default screenClassRender(ProviderCard)