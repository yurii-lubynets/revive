import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { bindActionCreators } from 'redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import * as userAction from '../../../action/user/UserAction'

import screenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'

import RenderTextField from '../../../common/components/textbox/TextBoxFormik'
import Button, { ButtonType } from '../../../common/components/button/Button'
import Icon from '../../../common/components/icon/Icon'

import styles from '../UserContainer.module.css'


class LicenceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.userAction.loadSPEducation()
  }
  
  render() {
    const { intl } = this.context

    const { screen, licenseState: { data, isLoading }, userAction: { addSPLicense, removeSPLicense } } = this.props

    const validationSchema = Yup.object().shape({
      country: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      state: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      from: Yup.string().min(4).max(4).required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      file: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
    })
    
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            country: '',
            state: '',
            from: '',
            file: '',
          }}
          onSubmit={(values, { resetForm }) => addSPLicense(values, resetForm)}
          render={({ resetForm }) => (
            <Form autoComplete="off" className={classNames.bind(styles)(styles.educationContainer, { 
              educationContainerMobile: isMobile(screen),
            })}>
              <Field name="country" label={intl.formatMessage({ id: 'page.registration.license.country' })} component={RenderTextField}/>
              <Field name="state" label={intl.formatMessage({ id: 'page.registration.license.state' })} component={RenderTextField} />
              <Field name="from" label={intl.formatMessage({ id: 'page.registration.license.from' })} component={RenderTextField} />
              <Field name="file" label={intl.formatMessage({ id: 'page.registration.license.law' })} component={RenderTextField} />
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.ButtonCnl}
                  handleClick={() => resetForm()}
                  type={ButtonType.SECONDARY}
                  value={intl.formatMessage({ id: 'page.registration.education.button1' })}
                />
                <Button
                  className={styles.Button}
                  submit
                  value={intl.formatMessage({ id: 'page.registration.education.button2' })}
                />
              </div>
            </Form>
          )}
        />
        <div className={styles.educations}>
          {!isLoading && data && data.map((item, index) =>
            <div key={index} className={styles.educationItem}>
              <button onClick={() => removeSPLicense(item.educationId)}><Icon name="delete"/></button>
              <div>License from {item.year}</div>
              <div>{item.country}, {item.state}</div>
            </div>)}
        </div>
      </div>
    )
  }
}

LicenceForm.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  licenseState: state.user.licenses,
})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(screenClassRender(LicenceForm)))