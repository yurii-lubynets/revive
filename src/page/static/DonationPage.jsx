import React from 'react'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'

import screenClassRender from '../../util/ScreenClassRender'
import { isMobile } from '../../util/responsive'
import styles from './StaticStyles.module.css'

const DonationPage = ({ screen }) => 
  <Container className={classNames.bind(styles)(styles.staticContainer, { 
    staticContainerMobile: isMobile(screen),
  })}>
    <h1 className={styles.staticTitle}>Donation</h1>
  </Container>

export default screenClassRender(DonationPage)