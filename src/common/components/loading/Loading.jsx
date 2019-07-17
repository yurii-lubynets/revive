import React from 'react'

import styles from './Loading.module.css'

const Loading = () => {
  return(
    <div className={styles.wrapper}>
      <div className={styles.loader}><span></span></div>
    </div>
  )
}

export default Loading