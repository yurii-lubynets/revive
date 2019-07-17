import React from 'react'
import classNames from 'classnames/bind'
import { FormattedMessage } from 'react-intl'

import Button from '../../../common/components/button/Button'

import styles from '../UserContainer.module.css'


const NoMessages = ({ className, user }) => 
  <div className={classNames.bind(styles)(styles.noMessages, className)}>
    <h1><FormattedMessage id="page.nomessages.title" /></h1>
    {!user && <p><FormattedMessage id="page.nomessages.description" /></p>}
    {!user && <Button className={styles.ButtonLink} value={<FormattedMessage id="page.nomessages.start" />} path="/"/>}
  </div>


export default NoMessages