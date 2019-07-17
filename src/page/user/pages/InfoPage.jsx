import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as userAction from '../../../action/user/UserAction'

import Icon from '../../../common/components/icon/Icon'
import Button, { ButtonType } from '../../../common/components/button/Button'
import RenderTextField from '../../../common/components/textbox/TextBoxFormik'
import TitleDropdown from '../utils/TitleDropdown'
import { sexOptions } from '../../../common/constant/SexOptionsConst'
import Phone from '../../../common/components/phone/PhoneInput'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import styles from '../UserContainer.module.css'

class InfoPage extends Component {
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

  render() {
    const { intl } = this.context
    const { screen, loginState: { user }, userAction, userState } = this.props
    
    const { title, firstName, middleName, lastName, phone_number } = user
    const { updated, error } = userState
    
    const validationSchema = Yup.object().shape({
      title: Yup.string().nullable(),
      firstName: Yup.string().required(`${intl.formatMessage({ id: 'page.account.firstName.error' })}`),
      middleName: Yup.string().nullable(),
      lastName: Yup.string().required(`${intl.formatMessage({ id: 'page.account.lastName.error' })}`),
      phone: Yup.string().required(`${intl.formatMessage({ id: 'page.account.phone.error' })}`),
    })
    return <div className={classNames.bind(styles)(styles.formContainer, {
      formContainerMobile: isMobile(screen),
    })}>
      <h1 className={styles.titleInfo}>{intl.formatMessage({ id: 'page.account.title' })}</h1>
      <p className={styles.subTitle}>{intl.formatMessage({ id: 'page.join.form.email.placeholder' })}</p>
      <div className={styles.info}>{user.email}</div>
      <h1 className={styles.title}>{intl.formatMessage({ id: 'page.account.link' })}</h1>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize={true}
        initialValues={{
          title : title || '',
          firstName : firstName || '',
          middleName : middleName || '',
          lastName : lastName || '',
          phone: phone_number || '',
        }}
        onSubmit={values => userAction.updateUser(values)}
        render={({ setFieldValue }) => (
          <Form className={styles.form} autoComplete="off">

            <Field name="title" label={intl.formatMessage({ id: 'page.account.form.title' })} setFieldValue={setFieldValue} component={TitleDropdown} options={sexOptions}/>
            <Field name="firstName" label={intl.formatMessage({ id: 'page.account.form.firstname' })} component={RenderTextField} />
            <Field name="middleName" label={intl.formatMessage({ id: 'page.account.form.middlename' })} component={RenderTextField} />
            <Field name="lastName" label={intl.formatMessage({ id: 'page.account.form.lastname' })} component={RenderTextField} />
              
            <h1 className={styles.phone}>{intl.formatMessage({ id: 'page.account.contact' })}</h1>
            <Field name="phone" label={intl.formatMessage({ id: 'page.account.form.phone' })} component={Phone}/>
            {error && (<p className={styles.error}>{intl.formatMessage({ id: 'page.account.form.error' })}</p>)}
            {updated ? (
              <div className={styles.confirmationContainer}>
                <p className={styles.success}>{intl.formatMessage({ id: 'page.account.form.success' })}</p>
                <Button
                  className={styles.confirmationButton}
                  type={ButtonType.CONFIRMATION}
                  icon={<Icon name="check"/>}
                  value=""
                />
              </div>
            ) : (
              <Button className={styles.Button} submit type={ButtonType.PRIMARY} value={intl.formatMessage({ id: 'page.account.form.submit' })}/>
            )}
          </Form>
        )}
      />
    </div>
  }
}

InfoPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  loginState: state.auth.login,
  userState: state.user.user,
})
const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(InfoPage)))