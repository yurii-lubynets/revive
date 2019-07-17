import React from 'react'
import classNames from 'classnames/bind'
import { Container, Hidden } from 'react-grid-system'

import Logo from '../logo/Logo'
import screenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'

import styles from './Header.module.css'

const  Header = ({ screen, desktopRight, mobileRight, isOpen, handleClick }) =>
  <header className={classNames.bind(styles)(styles.headerContainer, { 
    isOpen,
    headerContainerMobile: isMobile(screen),
  })}>
    <Container className={styles.contentContainer}>
      <Logo handleClick={handleClick}/>
      <Hidden xl lg md>
        <div className={styles.rightSide}>
          {mobileRight}
        </div>
      </Hidden>
      <Hidden sm xs>
        <div className={styles.rightSide}>
          {desktopRight}
        </div>
      </Hidden>
    </Container>
  </header>

export default screenClassRender(Header)