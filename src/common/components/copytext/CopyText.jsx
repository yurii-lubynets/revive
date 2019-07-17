import React, { useRef, useState } from 'react'

import Icon from '../icon/Icon'

export default function CopyText(props) {
  const { value, styles, success } = props
  const [copySuccess, setCopySuccess] = useState('')

  const textRef = useRef(null)

  const copyToClipboard = () => {
    textRef.current.select()
    document.execCommand('copy')
    setCopySuccess(success)
    setTimeout(() => {
      setCopySuccess('')
    }, 4000)
  }
  return (
    <div className={styles}>
      {copySuccess && <div>{copySuccess}</div>}
      <input
        type="text"
        readOnly
        onClick={copyToClipboard}
        ref={textRef}
        value={value}
      />
      <Icon name="open-new-tab"/>
    </div>
  )
}