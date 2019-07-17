import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { bindActionCreators } from 'redux'

import * as userAction from '../../../action/user/UserAction'

import { SIZE } from '../../../common/constant/FileSize'

import Icon from '../../../common/components/icon/Icon'

import styles from '../UserContainer.module.css'


class Identification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      status: 'In progress',
      error: '',
      submit: '',
      imagePreviewUrl: '',
      doc:  {},
    }
  }
  _handleSubmit = e => {
    const { intl } = this.context

    this.setState({
      submit: intl.formatMessage({ id: 'page.registration.identification.submit' }),
    }) 
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    const { intl } = this.context
    e.preventDefault()

    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = () => {
      if (file.size > SIZE) {
        this.setState({
          error: intl.formatMessage({ id: 'page.registration.identification.error' }),
        })        
      } else {
        this.setState({
          error: '',
          file: file,
          imagePreviewUrl: reader.result,
        })
        this._handleSubmit(e)      
      }
    }
    reader.readAsDataURL(file)
  }
  render() {
    const { intl } = this.context
    let { imagePreviewUrl, file, error, submit, doc, status } = this.state
    const docs = [
      {
        label: intl.formatMessage({ id: 'page.registration.identification.id' }),
        id: 1,
      },
      {
        label: intl.formatMessage({ id: 'page.registration.identification.passport' }),
        id: 2,
      },
      {
        label: intl.formatMessage({ id: 'page.registration.identification.driver' }),
        id: 3,
      },
      {
        label: intl.formatMessage({ id: 'page.registration.identification.card' }),
        id: 4,
      },
    ]

    return (
      <div className={styles.identificationContainer}>
        <form>
          <div>{docs.map((item, index) => 
            <div
              className={classNames.bind(styles)(styles.option, { selected: doc.id === item.id })}
              onClick={() => this.setState({ doc: item })}
              key={index}>
              {item.label}
            </div>)}</div>
          <label htmlFor="card" className={classNames.bind(styles)({ disabled: !doc.id })}>
            {intl.formatMessage({ id: 'page.registration.identification.add' })}
            <input
              disabled={!doc.id}
              id="card"
              type="file"
              style={{ visibility: 'hidden' }}
              accept=".png, .jpg, .pdf"
              onChange={e => this._handleImageChange(e)}
            />
          </label>
        </form>
        {imagePreviewUrl && doc && 
        <div style={{ marginBottom: '20px' }}>
          <div className={styles.status}>{status}</div>
          <div className={styles.imagePreview}>
            <button className={styles.remove} onClick={() => this.setState({ imagePreviewUrl: '', file: '', submit: '' })}><Icon name="delete"/></button>
            <div>
              <div>{doc.label}</div>
              <div>{file.name}</div>
            </div>
            <img src={imagePreviewUrl} alt=""/>
          </div>
        </div>
        }
        <p className={styles.typeFiles}>{intl.formatMessage({ id: 'page.registration.form.identification.type' })}</p>
        {error && <div className={styles.error}>{error}</div>}
        {submit && <div className={styles.submit}>{submit}</div>}
      </div>
    )
  }
}

Identification.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Identification))