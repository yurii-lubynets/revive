import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { Container, Hidden } from 'react-grid-system'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import WithDelay from '../../../util/WithDelay'

import * as loginAction from '../../../action/auth/LoginAction'
import * as contentSearchAction from '../../../action/user/ContentSearchAction'

import Button, { ButtonType } from '../../../common/components/button/Button'
import Modal from '../../../common/components/modal/Modal'
import Loading from '../../../common/components/loading/Loading'
import CopyText from '../../../common/components/copytext/CopyText'

import styles from './ProviderPage.module.css'

class ProviderPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }

  componentDidMount() {
    const { match, contentSearchAction } = this.props
    
    contentSearchAction.loadProvider(match.params.providerId)
  }

  componentWillUnmount() {
    this.setState({ showModal: false })
    this.props.contentSearchAction.flushContactProvider()
  }

  contactSP = () => {
    if (this.props.loginState.isAuthenticated && !this.props.providerState.provider.userId) {
      
      this.props.contentSearchAction.contactProvider(this.props.providerState.provider.id)
      const textField = document.createElement('textarea')
      textField.innerText = this.props.providerState.provider.email
      document.body.appendChild(textField)
      textField.select()
      document.execCommand('copy')
      textField.remove()

    } else {
      this.setState({ showModal : true })
    }
  }

  render() {
    const { intl } = this.context
    const { screen, loginState: { user, isAuthenticated }, providerState: { provider, isLoading, clickContact, error } } = this.props
    const { showModal } = this.state

    const { countries, description, languages, logoImg, providerName, providerType, email, userId } = provider

    const contactLabel = () => {
      if (providerType !== 'revivegration Service') {
        return providerName && providerName.substr(0, providerName.indexOf(' '))
      } else {
        return providerName
      }
    }

    return (
      <Fragment>
        {isLoading
          ? <WithDelay waitBeforeShow={2000}><Loading/></WithDelay>
          : <Fragment>
            {error
              ? <div>Maintenance</div>
              : <Fragment>
                <div className={classNames.bind(styles)(styles.backgroundHeader, { 
                  backgroundHeaderMobile: isMobile(screen),
                })}></div>

                <Container className={classNames.bind(styles)(styles.providerContainer, { 
                  providerContainerMobile: isMobile(screen),
                })}>
                  <div className={styles.providerInformation}>
                    <div className={styles.infoBlock}>
                      <div className={styles.providerDetail}>
                        {logoImg && <div className={styles.providerPhotoContainer}><div className={styles.providerPhoto} style={ { backgroundImage: `url(${logoImg})` } }></div></div>}
                        <div>
                          <div className={styles.providerName}>{providerName}</div>
                          <div className={styles.providerType}>{providerType}</div>
                        </div>
                      </div>
                      <div className={styles.propsTypes}>
                        <div>{intl.formatMessage({ id: 'page.provider.country' })}</div>
                        <div>{countries && countries.map(item => item.countryName).join(', ')}</div>
                      </div>
                      <div className={styles.propsTypes}>
                        <div>{intl.formatMessage({ id: 'page.provider.languages' })}</div>
                        <div>{languages && languages.map(item => item.languageName).join(', ')}</div>
                      </div>
                    </div>
                    <Hidden xs sm md>
                      <div className={styles.contactContainer}>
                        <Button
                          type={ButtonType.PRIMARY}
                          href={isAuthenticated && !userId && `mailto:${email}`}
                          path={isAuthenticated && userId && `/user/chat/${userId}`}
                          value={`${intl.formatMessage({ id: 'page.provider.contact' })} ${contactLabel()}`}
                          handleClick={this.contactSP}
                          className={styles.providerContact}
                        />
                        {!!clickContact && <CopyText
                          value={email || 'test@gmail.com'}
                          styles={styles.copyTextContainer}
                          success={intl.formatMessage({ id:'page.provider.contact.success' })}
                        />}
                      </div>
                    </Hidden>
                  </div>
                  <div className={classNames.bind(styles)(styles.providerDescription, { 
                    providerDescriptionMobile: isMobile(screen),
                  })}>
                    {description}
                  </div>
                </Container>
                <Hidden xl lg>
                  <footer className={styles.footerMobile}>
                    {!!clickContact
                      ? <CopyText
                        value={email}
                        styles={styles.copyTextContainer}
                        success={intl.formatMessage({ id:'page.provider.contact.success' })}
                      />
                      : <Button
                        type={ButtonType.PRIMARY}
                        href={isAuthenticated && !userId && `mailto:${email}`}
                        path={isAuthenticated && userId && `/user/chat/${userId}`}
                        value={`${intl.formatMessage({ id: 'page.provider.contact' })} ${contactLabel()}`}
                        handleClick={this.contactSP}
                        className={styles.providerContact}
                      />}
                  </footer>
                </Hidden>
              </Fragment>}
            <Modal
              show={showModal}
              handleClose={()=>this.setState({ showModal: false })}
              label={intl.formatMessage({ id: 'page.search.modal' })}
            >
              <Button
                type={ButtonType.PRIMARY}
                value={intl.formatMessage({ id: 'page.login.title' })}
                path="/account/login"
                className={styles.modalButton}
                location={this.props.location && this.props.location.pathname}
              />
              <p className={styles.modalFooter}>
                {intl.formatMessage({ id: 'page.login.footer1' })}
                &nbsp;
                <Link to="/account/join">{intl.formatMessage({ id: 'page.login.footer2' })}</Link>
              </p>
            </Modal>
          </Fragment>}
      </Fragment>
    )
  }
}

ProviderPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  providerState: state.search.provider,
  loginState: state.auth.login,
})

const mapDispatchToProps = dispatch => ({
  contentSearchAction: bindActionCreators(contentSearchAction, dispatch),
  loginAction: bindActionCreators(loginAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(ProviderPage)))