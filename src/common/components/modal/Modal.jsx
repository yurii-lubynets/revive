
import React from 'react'
import classNames from 'classnames/bind'

import Close from '../icon/Close'


import styles from './Modal.module.css'

const Modal = ({ show, children, label, handleClose, className }) => {
  return (
    <div className={classNames.bind(styles)(styles.modal, { show })}>
      <section className={classNames.bind(styles)(styles.modalMain, className )}>
        <h3>{label}</h3>
        <div>{children}</div>
        <button className={styles.close} onClick={handleClose}><Close /></button>
      </section>
    </div>
  )
}

export default Modal