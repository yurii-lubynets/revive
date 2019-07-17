import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as userAction from '../../../action/user/UserAction'
import * as contentAction from '../../../action/user/ContentSearchAction'

import Button, { ButtonType } from '../../../common/components/button/Button'
import RenderTextField, { TextArea } from '../../../common/components/textbox/TextBoxFormik'
import Autocomplete from '../../../common/components/autocomplete/Autocomplete'
import Phone from '../../../common/components/phone/PhoneInput'
import Modal from '../../../common/components/modal/Modal'

import TitleDropdown from '../utils/TitleDropdown'
import EducationForm from '../utils/EducationForm'
import LicenceForm from '../utils/LicenceForm'
import CertificateForm from '../utils/CertificateForm'
import MediaAccountForm from '../utils/MediaAccountForm'
import Identification from '../utils/Identification'
import RadioButtonField from '../utils/RadioButtonField'
import Tooltip from '../utils/Tooltip'

import { isMobile } from '../../../util/responsive'
import ScreenClassRender from '../../../util/ScreenClassRender'

import { sexOptions2 } from '../../../common/constant/SexOptionsConst'

import styles from '../UserContainer.module.css'

const MAX_INPUT  = 600

class RegistrationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstShow: true,
    }
  }
  componentDidMount() {
    this.props.contentAction.loadData()
  }
  componentWillUnmount() {
    this.props.userAction.flushState()
  }

  render() {
    const { intl } = this.context
    const { firstShow } = this.state
    const { screen, userAction: { updateSP, flushState, addSPCountries, addSPLanguages, addSPSkills }, providerInfoState: { savedInfo, updated, error }, loginState: { user }, dataState: { skills, skillsSP, languages, languagesSP, countries, countriesSP } } = this.props
    const { countryId, providerName, providerFirstName, providerLastName, aboutMe, description, gender } = savedInfo
    const providerTypes = [
      { value: 'attorney', label: intl.formatMessage({ id: 'page.registration.type1' }) },
      { value: 'service', label: intl.formatMessage({ id: 'page.registration.type2' }) },
    ]
    
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().when('type', {
        is: providerTypes[0].value,
        then: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      }).when('type', {
        is: undefined,
        then: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      }),
      lastName: Yup.string().when('type', {
        is: providerTypes[0].value,
        then: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      }).when('type', {
        is: undefined,
        then: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      }),
      providerName: Yup.string().when('type', {
        is: providerTypes[1].value,
        then: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      }),
      gender: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      country: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      type: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      services: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      languages: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      skills: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      description: Yup.string().min(60).required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      aboutMe: Yup.string().min(150).max(MAX_INPUT).required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      email: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      phone: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
    })
    return <div className={classNames.bind(styles)(styles.registrationContainer, {
      registrationContainerMobile: isMobile(screen),
    })}>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize={true}
        initialValues={{
          firstName : providerFirstName || '',
          lastName : providerLastName || '',
          providerName: providerName || '',
          gender: gender || '',
          country: countries.filter(item => item.id === countryId)[0] || '',
          type: '',
          services: countriesSP || '',
          languages: languagesSP || '',
          skills: skillsSP || '',
          description: description || '',
          aboutMe: aboutMe || '',
          email: user && user.email || '',
          phone: '',
        }}
        onSubmit={values => {updateSP(values); flushState()}}
        render={({ setFieldValue, values }) => (
          <Form className={styles.form} autoComplete="off">
            <h1>{intl.formatMessage({ id: 'page.registration.info' })}</h1>
            {values.type !== providerTypes[1].value
              ? <Fragment>
                <Field name="firstName" label={intl.formatMessage({ id: 'page.registration.form.firstname' })} component={RenderTextField} />
                <Field name="lastName" label={intl.formatMessage({ id: 'page.registration.form.lastname' })} component={RenderTextField} withTooltip/>
              </Fragment>
              : <Field name="providerName" label={intl.formatMessage({ id: 'page.registration.form.providerName' })} component={RenderTextField} />}
            <Field name="gender" label={intl.formatMessage({ id: 'page.registration.form.gender' })} setFieldValue={setFieldValue} component={RadioButtonField} options={sexOptions2}/>
            <h1>{intl.formatMessage({ id: 'page.registration.professional' })}</h1>
            <Field name="country" label={intl.formatMessage({ id: 'page.registration.country' })} setFieldValue={setFieldValue} component={TitleDropdown} options={countries}/>
            <Field name="type" label={intl.formatMessage({ id: 'page.registration.type' })} setFieldValue={setFieldValue} component={RadioButtonField} options={providerTypes}/>
            <Field name="services" label={intl.formatMessage({ id: 'page.registration.services' })}  component={Autocomplete} options={countries || []} handleChange={e => addSPCountries(e)}/>
            <Field name="languages" label={intl.formatMessage({ id: 'page.registration.languages' })} component={Autocomplete} options={languages} handleChange={e => addSPLanguages(e)}/> 
            <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.languages.tip' })}</p>

            <h1>{intl.formatMessage({ id: 'page.registration.skills' })}</h1>
            <Field name="skills" label={intl.formatMessage({ id: 'page.registration.skills' })}  component={Autocomplete} options={skills} handleChange={e => addSPSkills(e)}/>
            <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.skills.tip' })}</p>

            <h1>{intl.formatMessage({ id: 'page.registration.description' })}</h1>
            <Field name="description" label={intl.formatMessage({ id: 'page.registration.description.title' })} component={RenderTextField} />
            <p>{intl.formatMessage({ id: 'page.registration.description.tip' })}</p>
            <Field name="aboutMe" label={intl.formatMessage({ id: 'page.registration.aboutMe' })} component={TextArea} />
            <p>
              {intl.formatMessage({ id: 'page.registration.aboutMe.tip' })}
              <span className={styles.counter}>{`${values.aboutMe.length}/${MAX_INPUT}`}</span>
            </p>
            <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.aboutMe.tip1' })}</p>

            <h1>{intl.formatMessage({ id: 'page.registration.information' })}<Tooltip/></h1>
            <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.information.tip' })}</p>
            <Field disabled name="email" label={intl.formatMessage({ id: 'page.registration.email' })} component={RenderTextField} />
            <Field name="phone" label={intl.formatMessage({ id: 'page.registration.phone1' })} component={Phone}/>
            <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.information.tip1' })}</p>
            {error && <div className={styles.error}>{intl.formatMessage({ id: 'page.registration.error1' })}</div>}
            <Button className={styles.Button} submit type={ButtonType.PRIMARY} value={intl.formatMessage({ id: 'page.registration.submit1' })}/>
          </Form>
        )}
      />
      <h1>{intl.formatMessage({ id: 'page.registration.media.title' })}</h1>
      <MediaAccountForm/>

      <h1>{intl.formatMessage({ id: 'page.registration.license.title' })}<Tooltip/></h1>
      <LicenceForm/>


      <h1>{intl.formatMessage({ id: 'page.registration.form.identification' })}<Tooltip/></h1>
      <Identification/>
      <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.form.identification.tip' })}</p>
      <Link target="_blank" to="/tos">{intl.formatMessage({ id: 'page.registration.form.identification.link' })}</Link>

      <h1>{intl.formatMessage({ id: 'page.registration.education.title' })}</h1>
      <EducationForm/>
      
      <h1>{intl.formatMessage({ id: 'page.registration.certificate.title' })}</h1>
      <CertificateForm/>
      <p className={styles.tip}>{intl.formatMessage({ id: 'page.registration.certificate.tip' })}</p>
      
      <Modal
        className={styles.registrationPopup}
        show={firstShow}
        handleClose={() => this.setState({ firstShow: false })}
        label={intl.formatMessage({ id: 'page.registration.popup.title' })}
      >
        <p className={styles.registrationInfo}>
          {intl.formatMessage({ id: 'page.registration.popup.description' })}
          {intl.formatMessage({ id: 'page.registration.popup.description2' })}
          {intl.formatMessage({ id: 'page.registration.popup.description3' })}
        </p>
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.popup.description4' })}</p>
        <div className={styles.registrationTip}><Tooltip/>{intl.formatMessage({ id: 'page.registration.popup.safe' })}</div>
        <Button
          type={ButtonType.PRIMARY}
          value={intl.formatMessage({ id: 'page.registration.popup.button' })}
          handleClick={() => this.setState({ firstShow: false })}
          className={styles.registrationPopupBtn}
        />
      </Modal>
      <Modal
        className={styles.registrationPopup}
        show={updated}
        handleClose={() => flushState()}
        label={intl.formatMessage({ id: 'page.registration.finish.title' })}
      >
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.finish.description1' })}</p>
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.finish.description2' })}</p>
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.finish.description4' })}</p>
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.finish.description5' })}</p>
        <p className={styles.registrationInfo}>{intl.formatMessage({ id: 'page.registration.finish.description6' })}</p>
        <Button
          type={ButtonType.PRIMARY}
          value={intl.formatMessage({ id: 'page.registration.finish.button' })}
          handleClick={() => flushState()}
          className={styles.registrationPopupBtn}
        />
      </Modal>
    </div>
  }
}

RegistrationPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  providerInfoState: state.user.providerInfo,
  loginState: state.auth.login,
  dataState: state.user.data,
})
const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
  contentAction: bindActionCreators(contentAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(RegistrationPage)))