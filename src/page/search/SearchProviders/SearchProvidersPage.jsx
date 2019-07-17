import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row } from 'react-grid-system'
import queryString from 'query-string'
import classNames from 'classnames/bind'

import ProviderCard from './ProviderCard'
import Modal from '../../../common/components/modal/Modal'
import Button, { ButtonType } from '../../../common/components/button/Button'
import Loading from '../../../common/components/loading/Loading'

import ScreenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'
import WithDelay from '../../../util/WithDelay'

import * as loginAction from '../../../action/auth/LoginAction'
import * as contentSearchAction from '../../../action/user/ContentSearchAction'

import styles from './SearchProvidersPage.module.css'

const AUTH_HOST = process.env.REACT_APP_DEFAULT_API_HOST

class SearchProvidersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryName: '',
      visaType: '',
      showModal: false,
    }
  }

  componentWillMount() {
    const { location, contentSearchAction } = this.props
    const values = queryString.parse(location.search)

    if (values.countryId === '' || values.countryId === 'any' ||  values.countryId === undefined) {
      values.countryId = null
      this.setState({ countryName: '' })
    } else {
      fetch(`${AUTH_HOST}countries/${values.countryId}`)
        .then(response => response.json())
        .then(data => this.setState({ countryName: data.countries && data.countries[0].countryName }))
        .catch(error => console.log(error))
    }
    
    if (values.visaTypeId === '' || values.visaTypeId === 'any' || values.visaTypeId === undefined) {
      values.visaTypeId = null
      this.setState({ visaType: '' })
    } else {
      fetch(`${AUTH_HOST}visaTypes/${values.visaTypeId}`)
        .then(response => response.json())
        .then(data => this.setState({ visaType: data.name }))
        .catch(error => console.log(error))
    }

    contentSearchAction.loadSearchProviders(values)
  }

  componentWillUnmount() {
    this.setState({ showModal: false })
  }

  contactSP = ({ providerId, email, userId }) => {
    if (this.props.loginState.isAuthenticated && !userId) {
      this.props.contentSearchAction.contactProvider(providerId)
      const textField = document.createElement('textarea')
      textField.innerText = email
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
    const { searchProvidersState, loginState: { isAuthenticated, user }, screen } = this.props
    const { countryName, visaType, showModal } = this.state

    const { searchProviders, error, isLoading } = searchProvidersState

    const str1 = (countryName || visaType) && `${intl.formatMessage({ id: 'page.search.title3' })} ${countryName} ${visaType} ${intl.formatMessage({ id: 'page.search.title5' })}`
    const searchResultsTitle = `${searchProviders.length} ${intl.formatMessage({ id: 'page.search.title0' })} ${(searchProviders.length === 1) ? `${intl.formatMessage({ id: 'page.search.title1' })}` : `${intl.formatMessage({ id: 'page.search.title2' })}`} `


    const onHandleClick = () => !isAuthenticated && this.setState({ showModal : true })

    return (
      <Container className={classNames.bind(styles)(styles.contentContainer, { 
        contentContainerMobile: isMobile(screen),
      })}>
        {isLoading
          ? <WithDelay waitBeforeShow={2000}><Loading/></WithDelay>
          : <Fragment>
            {error
              ? <div>Maintenance</div>
              : <div className={styles.providersContainer}>
                <h2 className={styles.header}><span>{searchResultsTitle}</span>{str1}</h2>
                <Row justify="start" style={{ maxWidth: '956px', margin: '0' }}>
                  {searchProviders.map((provider, index) => 
                    <ProviderCard
                      provider={provider}
                      key={index}
                      isAuthenticated={isAuthenticated}
                      user={user}
                      handleClick={()=>onHandleClick(provider)}
                    />
                  )}
                </Row>
              </div>
            }
          </Fragment>
        }
        <Modal
          show={showModal}
          handleClose={()=>this.setState({ showModal: false })}
          label={intl.formatMessage({ id: 'page.search.modal' })}
        >
          <Button
            type={ButtonType.PRIMARY}
            value={intl.formatMessage({ id: 'page.login.title' })}
            path="account/login"
            className={styles.modalButton}
            location={this.props.location.pathname+this.props.location.search}
          />
          <p className={styles.modalFooter}>
            {intl.formatMessage({ id: 'page.login.footer1' })}
            &nbsp;
            <Link to="/account/join">{intl.formatMessage({ id: 'page.login.footer2' })}</Link>
          </p>
        </Modal>
      </Container>
    )
  }
}

SearchProvidersPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  searchProvidersState: state.search.searchProviders,
  loginState: state.auth.login,
  providerState: state.search.provider,
})
const mapDispatchToProps = dispatch => ({
  contentSearchAction: bindActionCreators(contentSearchAction, dispatch),
  loginAction: bindActionCreators(loginAction, dispatch),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(SearchProvidersPage)))