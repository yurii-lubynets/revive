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

import styles from '../UserContainer.module.css'

const ACCOUNTS = [
  {
    value: 'Firm Website',
    label: 'Firm Website',
  },
  {
    value: 'Personal Website',
    label: 'Personal Website',
  },
  {
    value: 'LinkedIn',
    label: 'LinkedIn',
  },
  {
    value: 'Professional Facebook page',
    label: 'Professional Facebook page',
  },
]

class MediaAccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { intl } = this.context

    const { screen, userAction: { addSPMedia, removeSPMedia }, linksState: { data, isLoading } } = this.props

    const validationSchema = Yup.object().shape({
      link: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
      state: Yup.string().required(`${intl.formatMessage({ id: 'page.registration.error' })}`),
    })

    return (
      <div>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            link: '',
            state: '',
          }}
          onSubmit={(values, { resetForm }) => addSPMedia(values, resetForm)}
          render={({ resetForm, setFieldValue }) => (
            <Form autoComplete="off" className={classNames.bind(styles)(styles.certificateContainer, { 
              certificateContainerMobile: isMobile(screen),
            })}>
              <Field name="link" label={intl.formatMessage({ id: 'page.registration.media.link' })} component={RenderTextField}/>
              <Field name="state" label={intl.formatMessage({ id: 'page.registration.media.state' })}  setFieldValue={setFieldValue} component={TitleDropdown} options={ACCOUNTS} />
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
              <button onClick={() => removeSPMedia(item.id)}><Icon name="delete"/></button>
              <div>{item.link}</div>
              <div>{item.state}</div>
            </div>)}
        </div>
      </div>
    )
  }
}

MediaAccountForm.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  linksState: state.user.links,
})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(screenClassRender(MediaAccountForm)))