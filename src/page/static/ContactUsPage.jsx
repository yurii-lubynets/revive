import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import * as userAction from '../../action/user/UserAction'

import screenClassRender from '../../util/ScreenClassRender'
import { isMobile } from '../../util/responsive'
import { testEmail } from '../../common/constant/RegxPatternConst'

import RenderTextField, { TextArea } from '../../common/components/textbox/TextBoxFormik'
import Icon from '../../common/components/icon/Icon'
import Button, { ButtonType } from '../../common/components/button/Button'
import Phone from '../../common/components/phone/PhoneInput'

import styles from './StaticStyles.module.css'


class ContactUsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentWillUnmount() {
    this.props.userAction.flushState()
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
  validateEmail = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.join.form.email.error.message2' })
    } else if (testEmail(value)) {
      return intl.formatMessage({ id: 'page.join.form.email.error.message1' })
    } else {
      return undefined
    }
  }
  validateFullName = value => {
    const { intl } = this.context
    if (value.length<1 || value.startsWith(' ') || value.endsWith(' ')) {
      return intl.formatMessage({ id: 'page.registration.submit.error.message3' })
    }
  }

  render() {
    const { intl } = this.context

    const { loginState, contactUsState: { sent, error }, userAction, screen } = this.props
    const { user: { firstName, lastName, phone_number, email, userType } } = loginState
  
    const validationSchema = Yup.object().shape({
      fullName: Yup.string().required(`${intl.formatMessage({ id: 'page.contactUs.fullName.error' })}`),
      phone: Yup.string().required(`${intl.formatMessage({ id: 'page.contactUs.phone.error' })}`),
      email: Yup.string().required(`${intl.formatMessage({ id: 'page.contactUs.email.error' })}`),
      subject: Yup.string().required(`${intl.formatMessage({ id: 'page.contactUs.subject.error' })}`),
      content: Yup.string().required(`${intl.formatMessage({ id: 'page.contactUs.content.error' })}`),
    })
    
    return (
      <Container className={classNames.bind(styles)(styles.contactsContainer, { 
        contactsContainerMobile: isMobile(screen),
      })}>
        {error ? (
          <div>Maintenance</div>
        ) : (
          <Fragment>
            <h1>{intl.formatMessage({ id: 'page.contactUs.title' })}</h1>
            <p className={styles.subTitle}>{intl.formatMessage({ id: 'page.contactUs.subTitle' })}</p>
            <Formik
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={{
                fullName: firstName || lastName ? `${firstName} ${lastName}`: '',
                phone: phone_number || '',
                email: email || '',
                subject: '',
                content: '',
              }}
              onSubmit={(values, { resetForm }) => userAction.contactUs(values, resetForm)}
              render={() => (
                <Form className={styles.form} autoComplete="off">
                  <Field name="fullName" validate={this.validateFullName} label={intl.formatMessage({ id: 'page.contactUs.fullName' })} component={RenderTextField} />
                  <Field name="phone" label={intl.formatMessage({ id: 'page.contactUs.phone' })} component={Phone}/>
                  <Field name="email" validate={this.validateEmail} label={intl.formatMessage({ id: 'page.contactUs.email' })} component={RenderTextField} />
                  <Field name="subject" label={intl.formatMessage({ id: 'page.contactUs.subject' })} component={RenderTextField} />
                  <Field name="content" label={intl.formatMessage({ id: 'page.contactUs.content' })} component={TextArea} />
                  {sent ? (
                    <div className={styles.confirmationContainer}>
                      <p className={styles.success}>{intl.formatMessage({ id: 'page.contactUs.success' })}</p>
                      <Button
                        className={styles.confirmationButton}
                        type={ButtonType.CONFIRMATION}
                        icon={<Icon name="check"/>}
                        value=""
                      />
                    </div>
                  ) : (
                    <Button
                      className={styles.Button}
                      submit
                      type={ButtonType.PRIMARY}
                      value={intl.formatMessage({ id: 'page.contactUs.submit' })}
                    />
                  )}
                </Form>
              )}
            />
          </Fragment>
        )}
      </Container>
    )
  }
}

ContactUsPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  loginState: state.auth.login,
  contactUsState: state.user.contactUs,
})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(screenClassRender(ContactUsPage)))