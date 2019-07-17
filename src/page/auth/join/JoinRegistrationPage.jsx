import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import WithDelay from '../../../util/WithDelay'

import Loading from '../../../common/components/loading/Loading'
import Button, { ButtonType } from '../../../common/components/button/Button'
import RenderTextField from '../../../common/components/textbox/TextBoxFormik'
import Modal from '../../../common/components/modal/Modal'
import Phone from '../../../common/components/phone/PhoneInput'

import * as joinAction from '../../../action/auth/JoinAction'


import styles from './JoinPage.module.css'

class JoinRegistrationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount() {
    this.props.joinAction.flushRegisterState()
  }

  validateFirstName = value => {
    const { intl } = this.context
    if (value.length<1 || value.startsWith(' ') || value.endsWith(' ')) {
      return intl.formatMessage({ id: 'page.registration.submit.error.message3' })
    }
  }
  
  validateLastName = value => {
    const { intl } = this.context
    if (value.length<1 || value.startsWith(' ') || value.endsWith(' ')) {
      return intl.formatMessage({ id: 'page.registration.submit.error.message3' })
    }
  }
  validatePhone = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.forgot.form.email1' })
    } else if (isNaN(value)) {
      return intl.formatMessage({ id: 'page.account.phone.error' })
    } else {
      return undefined
    }
  }

  handleRegistration = ({ firstName:firstname, lastName:lastname, phone } ) => {
    const { joinState, joinAction } = this.props
    const { email, password } = joinState.credentials

    if (email && password && firstname && lastname && phone) {
      const user = { email, firstname, lastname, password, phone }
      joinAction.registerUser(user)
    }
  }
  
  defineLabel = () => {
    const { intl } = this.context
    const { error409, description } = this.props.joinState

    if (error409) {
      switch (description) {
        case 'auth0':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'revive Account.'
        case 'google-oauth2':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'Google Account.'
        case 'facebook':
          return intl.formatMessage({ id: 'page.login.fb409' }) + 'Facebook Account.'
        default:
          return ''
      }
    }
  }

  render() {
    const { intl } = this.context
    const { joinState: { error, error409, isLoading }, joinAction, screen } = this.props

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required(intl.formatMessage({ id: 'page.registration.submit.error.message1' })),
      lastName: Yup.string().required(intl.formatMessage({ id: 'page.registration.submit.error.message2' })),
      phone: Yup.string().required(intl.formatMessage({ id: 'page.registration.submit.error.phone1' })),
    })

    return (
      <div className={classNames.bind(styles)(styles.joinPage, {
        joinPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.join.form.title' })}/>
        {isLoading ? (
          <WithDelay waitBeforeShow={2000}>
            <Loading/>
          </WithDelay>
        ) : (
          <div className={styles.joinPageContent}>
            <p className={styles.title}>{intl.formatMessage({ id: 'page.join.form.title' })}</p>
            <Formik
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
              }}
              onSubmit={({ firstName, lastName, phone }) => this.handleRegistration({ firstName, lastName, phone })}
              render={() => (
                <Form className={classNames.bind(styles)(styles.registrationForm, {
                  registrationFormMobile: isMobile(screen),
                })} autoComplete="off">
                  <Field validate={this.validateFirstName} name="firstName" label={intl.formatMessage({ id: 'page.registration.firstName' })} component={RenderTextField} />
                  <Field validate={this.validateLastName} name="lastName" label={intl.formatMessage({ id: 'page.registration.lastName' })} component={RenderTextField} />
                  <Field name="phone" label={intl.formatMessage({ id: 'page.registration.phone' })} component={Phone}/>
                  {error && <div className={styles.joinError}>{intl.formatMessage({ id: 'page.registration.form.error' })}</div>}
                  <Button
                    submit
                    className={styles.submitRegistrationButton}
                    type={ButtonType.PRIMARY}
                    value={intl.formatMessage({ id: 'page.registration.submit' })}
                  />

                </Form>
              )}
            />
            <Modal
              show={error409}
              handleClose={joinAction.flushRegisterState}
              label={this.defineLabel()}
            >
              <p className={styles.modalFooter}>{intl.formatMessage({ id: 'page.login.fb.revive2' })}</p>
              <Button
                type={ButtonType.PRIMARY}
                value={intl.formatMessage({ id: 'page.login.fb.ok' })}
                handleClick={joinAction.flushRegisterState}
                className={styles.modalButton}
              />
            </Modal>
          </div>
        )}
      </div>
    )
  }
}

JoinRegistrationPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  joinState: state.auth.join,
})

const mapDispatchToProps = dispatch => ({
  joinAction: bindActionCreators(joinAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(JoinRegistrationPage)))