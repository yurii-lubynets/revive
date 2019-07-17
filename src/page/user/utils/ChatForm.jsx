import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { isMobile } from '../../../util/responsive'
import Icon from '../../../common/components/icon/Icon'
import ResizableTextarea from './ResizableTextarea'

import styles from '../UserContainer.module.css'


const formikEnhancer = withFormik({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    text: Yup.string().required(),
  }),
  mapPropsToValues: ({ chatUser, sendMessage, userId, userName, providerName }) => ({
    chatUser,
    sendMessage,
    userId,
    userName,
    providerName,
  }),
  handleSubmit: (values, { resetForm }) => { 
    const { text, chatUser:toUserId, sendMessage, userId } = values
    sendMessage(toUserId, text.trim(), userId)
    resetForm()
  },
  displayName: 'TextForm',
})

const handleKeyDown = (e, cb, isDisabled, screen) => {
  if (e.key === 'Enter' && e.shiftKey === false && !isDisabled && !isMobile(screen)) {
    e.preventDefault()
    cb()
  }
}

const TextForm = ({ values, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.textBoxContainer} onKeyDown={e => handleKeyDown(e, handleSubmit, !(values.text && values.text.trim().replace(/(?:\r\n|\r|\n)/g, '')), values.screen)}>
      <ResizableTextarea
        value={values.text || ''}
        onChange={handleChange}
        placeholder="Type a message here"
      />
      <button disabled={!(values.text && values.text.trim().replace(/(?:\r\n|\r|\n)/g, ''))} className={styles.textSubmitButton} type="submit"><Icon name="send-icon"/></button>
    </form>
  )
}

const ChatForm = formikEnhancer(TextForm)

export default ChatForm 