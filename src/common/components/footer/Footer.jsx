import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Icon from '../icon/Icon'
import screenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'

import { socialNetworks } from '../../constant/SocialLinksConst'

import styles from './Footer.module.css'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    const { intl } = this.context
    const { screen } = this.props
    const Links = [
      {
        name: `${intl.formatMessage({ id: 'page.home.revive' })}`,
        path: '/',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.about' })}`,
        path: '/about',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.howItWorks' })}`,
        path: '/how-it-works',
      },
      {
        name: `${intl.formatMessage({ id: 'page.home.donation' })}`,
        path: '/donation',
      },
    ]

    return (
      <footer className={classNames.bind(styles)(styles.footer, { 
        footerMobile: isMobile(screen),
      })}>
        <Container className={classNames.bind(styles)(styles.footerContainer, { 
          footerContainerMobile: isMobile(screen),
        })}>
          <div className={classNames.bind(styles)(styles.leftSide, { 
            leftSideMobile: isMobile(screen),
          })}>
            {Links.map((item, index) => <Link key={index} to={item.path}>{item.name}</Link>)}
          </div>
          
          <div className={classNames.bind(styles)(styles.rightSide, { 
            rightSideMobile: isMobile(screen),
          })}>
            <p>{intl.formatMessage({ id: 'page.footer.follows' })}</p>
            <div className={styles.linkContainer}>
              {socialNetworks.map((item, index) => 
                <a
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.link}
                  key={index}>
                  <Icon name={item.name}/>
                </a>)}
            </div>
            <p className={styles.address}><Icon name="location"/>{intl.formatMessage({ id: 'page.footer.address' })}</p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.links}>
              <Link to="/privacy">
                {intl.formatMessage({ id: 'page.footer.policy' })}
              </Link>
              <Link to="/tos">
                {intl.formatMessage({ id: 'page.footer.terms' })}
              </Link>
            </div>
            <p>{intl.formatMessage({ id: 'page.footer.rights' })}</p>
          </div>
        </Container>
      </footer>
    )
  }
}

Footer.contextTypes = {
  intl: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  location: state.router.location,
})

export default withRouter(connect(mapStateToProps)(screenClassRender(Footer)))