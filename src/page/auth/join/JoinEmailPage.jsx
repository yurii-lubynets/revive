import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { reduxForm, Field } from 'redux-form'

import { isMobile } from '../../../util/responsive'
import { testEmail } from '../../../common/constant/RegxPatternConst'
import ScreenClassRender from '../../../util/ScreenClassRender'

import Button, { ButtonType } from '../../../common/components/button/Button'
import TextBox, { TextBoxType } from '../../../common/components/textbox/TextBox'
import CheckBox from '../../../common/components/checkbox/Checkbox'

import * as joinAction from '../../../action/auth/JoinAction'

import styles from './JoinPage.module.css'

class JoinEmailPageSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  validatePassword = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.join.form.password.error.message5' })
    } else if (value.startsWith(' ') || value.endsWith(' ')) {
      return intl.formatMessage({ id: 'page.join.form.password.error.message2' })
    } else if (value.length > 6) {
      return undefined
    } else {
      return intl.formatMessage({ id: 'page.join.form.password.error.message1' })
    }
  }

  validateCheckbox = value => {
    const { intl } = this.context
    if (!value) {
      return intl.formatMessage({ id: 'page.join.form.checkbox.error' })
    } else {
      return undefined
    }
  }

  handleJoin = ({ values }) => {
    const { email, passwordConfirm: password } = values
    const user = { email, password }

    this.props.joinAction.createUser(user)
    this.props.history.push('/account/join-email-2')
  }

  render() {
    const { intl } = this.context
    const { joinForm, screen, handleSubmit } = this.props

    return (
      <div className={classNames.bind(styles)(styles.joinPage, {
        joinPageMobile: isMobile(screen),
      })}>
        <Helmet title={intl.formatMessage({ id: 'page.join.form.title' })}/>
        <div className={styles.JoinScreenContainer}>
          <p className={styles.title}>{intl.formatMessage({ id: 'page.join.form.title' })}</p>
          <form
            onSubmit={handleSubmit(()=>this.handleJoin(joinForm))}
            autoComplete="off"
            className={classNames.bind(styles)(styles.joinForm, {
              joinFormMobile: isMobile(screen),
            })}>
            <div className={styles.formItems}>
              <TextBox
                type={TextBoxType.TEXT}
                name="email"
                validate={this.validateEmail}
                label={intl.formatMessage({ id: 'page.join.form.email.placeholder' })}
              />
              <TextBox
                type={TextBoxType.PASSWORD}
                name="passwordCreate"
                validate={this.validatePassword}
                label={intl.formatMessage({ id: 'page.join.form.passwordCreate.placeholder' })}
              />
              <TextBox
                type={TextBoxType.PASSWORD}
                name="passwordConfirm"
                validate={this.validatePassword}
                label={intl.formatMessage({ id: 'page.join.form.passwordConfirm.placeholder' })}
              />
            </div>
            <div className={styles.checkBoxContainer}>
              <Field 
                name="agreeConditions"
                component={CheckBox}
                validate={this.validateCheckbox}
                label={<div className={styles.checkBoxLabel}>
                  {intl.formatMessage({ id: 'page.join.form.privacy' })}
                  &nbsp;
                  <Link target="_blank" to="/tos">{intl.formatMessage({ id: 'page.join.form.footer.link2' })}</Link>
                  {intl.formatMessage({ id: 'page.join.form.footer.and' })}
                  <Link target="_blank" to="/privacy">{intl.formatMessage({ id: 'page.join.form.footer.link3' })}</Link>
                </div>}
              />
            </div>
            <Button
              className={styles.submitButton}
              type={ButtonType.PRIMARY}
              submit
              value={intl.formatMessage({ id: 'page.join.form.button.submit' })}
            />
          </form>
          <p className={styles.joinFooter}>
            {intl.formatMessage({ id: 'page.join.form.footer' })}&nbsp;<Link to="/account/login">{intl.formatMessage({ id: 'page.join.form.footer.link1' })}</Link>
          </p>
        </div>
      </div>
    )
  }
}

JoinEmailPageSection.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  joinForm: state.form.joinForm,
})

const mapDispatchToProps = dispatch => ({
  joinAction: bindActionCreators(joinAction, dispatch),
})

const JoinEmailPage = reduxForm({ form: 'joinForm' })(JoinEmailPageSection)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(JoinEmailPage)))