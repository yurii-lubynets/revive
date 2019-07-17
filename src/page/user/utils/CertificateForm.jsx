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


class CertificateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.userAction.loadSPEducation()
  }
  render() {
    const { intl } = this.context

    const { screen, userAction: { addSPAwards, removeSPAwards }, awardsState: { data, isLoading } } = this.props

    const validationSchema = Yup.object().shape({
      award: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      from: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      year: Yup.string().min(4).max(4).required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
    })
    
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            award: '',
            from: '',
            year: '',
          }}
          onSubmit={(values, { resetForm }) => addSPAwards(values, resetForm)}
          render={({ resetForm }) => (
            <Form autoComplete="off" className={classNames.bind(styles)(styles.certificateContainer, { 
              certificateContainerMobile: isMobile(screen),
            })}>
              <Field name="award" label={intl.formatMessage({ id: 'page.registration.certificate.award' })} component={RenderTextField}/>
              <Field name="from" label={intl.formatMessage({ id: 'page.registration.certificate.from' })} component={RenderTextField} />
              <Field name="year" label={intl.formatMessage({ id: 'page.registration.certificate.year' })} component={RenderTextField} />
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
              <button onClick={() => removeSPAwards(item.id)}><Icon name="delete"/></button>
              <div>{item.award}</div>
              <div>{item.from}, {item.year}</div>
            </div>)}
        </div>
      </div>
    )
  }
}

CertificateForm.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  awardsState: state.user.awards,
})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(screenClassRender(CertificateForm)))