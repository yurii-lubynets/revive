import React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import screenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'

import styles from './Logo.module.css'

const LogoIcon = () => <svg width="138" height="27" viewBox="0 0 138 27" fill="none">
  <rect y="1.4375" width="7.85454" height="24.1247" rx="3.92727" fill="#9DF2FF"/>
  <rect x="9.11694" y="3.96191" width="7.92399" height="26.602" rx="3.962" transform="rotate(-30 9.11694 3.96191)" fill="#31E495"/>
  <rect x="39.8337" y="1.4375" width="7.85454" height="24.1247" rx="3.92727" fill="#1D1F52"/>
  <rect x="31.7568" width="7.92399" height="26.602" rx="3.962" transform="rotate(30 31.7568 0)" fill="#0459FF"/>
</svg>

const Logo = ({ screen }) => <Link className={classNames.bind(styles)(styles.logoContainer, { 
  logoContainerMobile: isMobile(screen),
})} to="/"><LogoIcon/></Link>

export default screenClassRender(Logo)