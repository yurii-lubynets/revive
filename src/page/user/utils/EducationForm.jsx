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

import TitleDropdown from './TitleDropdown'

import RenderTextField from '../../../common/components/textbox/TextBoxFormik'
import Button, { ButtonType } from '../../../common/components/button/Button'
import Icon from '../../../common/components/icon/Icon'

import { countryList } from '../../../common/constant/CountryListConst'

import styles from '../UserContainer.module.css'


class EducationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'In progress',
    }
  }

  render() {
    const { intl } = this.context
    const { status } = this.state

    const { screen, userAction: { addSPEducation, removeSPEducation }, educationState: { loadedEducation, error, isLoading } } = this.props

    const validationSchema = Yup.object().shape({
      country: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      educationInstitution: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      title: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      major: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      graduationYear: Yup.string().min(4).max(4).required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
    })
    
    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            country: '',
            educationInstitution: '',
            title: '',
            major: '',
            graduationYear: '',
          }}
          onSubmit={(values, { resetForm }) => addSPEducation(values, resetForm)}
          render={({ resetForm, setFieldValue }) => (
            <Form autoComplete="off" className={classNames.bind(styles)(styles.educationContainer, { 
              educationContainerMobile: isMobile(screen),
            })}>
              {/* <Field name="country" label={intl.formatMessage({ id: 'page.registration.education.country' })}  setFieldValue={setFieldValue} component={TitleDropdown} options={countryList}/> */}
              <Field name="country" label={intl.formatMessage({ id: 'page.registration.education.country' })} component={RenderTextField}/>
              <Field name="educationInstitution" label={intl.formatMessage({ id: 'page.registration.education.college.university' })} component={RenderTextField} />
              <div className={styles.container}>
                <Field name="title" label={intl.formatMessage({ id: 'page.registration.education.form.title' })} component={RenderTextField} />
                <Field name="major" label={intl.formatMessage({ id: 'page.registration.education.major' })} component={RenderTextField} />
              </div>
              <Field name="graduationYear" label={intl.formatMessage({ id: 'page.registration.education.year' })} component={RenderTextField} />
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
          {!isLoading && loadedEducation && loadedEducation.map((item, index) =>
            <div key={index} className={styles.educationItem}>
              <div>{status}</div>
              <button onClick={() => removeSPEducation(item.educationId)}><Icon name="delete"/></button>
              <div>{item.title} - {item.major}</div>
              <div>{item.educationInstitution}, {item.countryName}, Graduated {item.graduationYear}</div>
            </div>)}
        </div>
      </div>
    )
  }
}

EducationForm.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  educationState: state.user.education,
})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(screenClassRender(EducationForm)))