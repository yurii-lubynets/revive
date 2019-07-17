import React from 'react'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'

import screenClassRender from '../../util/ScreenClassRender'
import { isMobile } from '../../util/responsive'

import styles from './StaticStyles.module.css'

const HowItWorks = ({ screen }) => 
  <Container className={classNames.bind(styles)(styles.staticContainer, { 
    staticContainerMobile: isMobile(screen),
  })}>
    <h1 className={styles.staticTitle}>How It Works</h1>
  </Container>

export default screenClassRender(HowItWorks)