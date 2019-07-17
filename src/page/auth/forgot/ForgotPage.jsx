import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { reduxForm } from 'redux-form'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'
import { testEmail } from '../../../common/constant/RegxPatternConst'
import Button, { ButtonType } from '../../../common/components/button/Button'
import TextBox, { TextBoxType } from '../../../common/components/textbox/TextBox'

import * as forgotAction from '../../../action/auth/ForgotAction'

import styles from './ForgotPage.module.css'

class ForgotPageSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount() {
    this.props.forgotAction.flushState()
  }

  validateEmail = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.forgot.form.email1' })
    } else if (testEmail(value)) {
      return intl.formatMessage({ id: 'page.join.form.email.error.message1' })
    } else {
      return undefined
    }
  }
  
  handleForgot = ({ values }) => this.props.forgotAction.forgotPassword({ email: values.email })  

  render() {
    const { intl } = this.context
    const { forgotState: { error }, forgotForm, handleSubmit, screen } = this.props

    return (
      <div className={classNames.bind(styles)(styles.forgotPage, {
        forgotPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.forgot.title' })}/>
        <p>{intl.formatMessage({ id: 'page.forgot.title' })}</p>
        <div className={styles.forgotFormContainer}>
          <form noValidate onSubmit={handleSubmit(()=>this.handleForgot(forgotForm))} autoComplete="off" className={classNames.bind(styles)(styles.forgotForm, {
            forgotFormMobile: isMobile(screen),
          })}>
            <TextBox
              type={TextBoxType.EMAIL}
              name="email"
              validate={this.validateEmail}
              label={intl.formatMessage({ id: 'page.forgot.form.email' })}
            />
            {error && <div className={styles.forgotError}>{intl.formatMessage({ id: 'page.forgot.form.failed' })}</div>}
            <Button
              className={styles.submitButton}
              type={ButtonType.PRIMARY}
              submit
              value={intl.formatMessage({ id: 'page.forgot.form.button' })}
            />
          </form>
        </div>
      </div>
    )
  }
}

ForgotPageSection.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  forgotState: state.auth.forgot,
  forgotForm: state.form.forgotForm,
})

const mapDispatchToProps = dispatch => ({
  forgotAction: bindActionCreators(forgotAction, dispatch),
})

const ForgotPage = reduxForm({ form: 'forgotForm' })(ForgotPageSection)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(ForgotPage)))