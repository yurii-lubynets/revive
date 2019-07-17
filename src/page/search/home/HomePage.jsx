import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { Container } from 'react-grid-system'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

import Loading from '../../../common/components/loading/Loading'
import Button, { ButtonType } from '../../../common/components/button/Button'

import ScreenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'
import WithDelay from '../../../util/WithDelay'

import * as contentSearchAction from '../../../action/user/ContentSearchAction'

import styles from './HomePage.module.css'

const PrevArrow = ({ onClick, className }) =>
  <div
    onClick={onClick}
    className={classNames.bind(styles)(styles.prevArrow, { 
      disabled: className.includes('disabled'),
    })}
  >
    <svg width="11" height="17" viewBox="0 0 11 17" fill="#fff">
      <path d="M3.40428 16.3792C2.782 16.9967 1.77308 16.9967 1.15079 16.3792C0.528511 15.7617 0.528511 14.7606 1.15079 14.1431L7.91125 7.43476C8.53354 6.81728 9.54246 6.81728 10.1647 7.43476C10.787 8.05225 10.787 9.05338 10.1647 9.67087L3.40428 16.3792Z" fill="white"/>
      <path d="M10.1647 7.43476C10.787 8.05225 10.787 9.05338 10.1647 9.67087C9.54246 10.2883 8.53355 10.2883 7.91126 9.67086L1.1508 2.96255C0.52852 2.34507 0.52852 1.34393 1.1508 0.72645C1.77309 0.108969 2.78201 0.108969 3.40429 0.72645L10.1647 7.43476Z" fill="white"/>
    </svg>
  </div>

const NextArrow = ({ onClick, className }) => 
  <div
    onClick={onClick}
    className={classNames.bind(styles)(styles.nextArrow, { 
      disabled: className.includes('disabled'),
    })}
  >
    <svg width="11" height="17" viewBox="0 0 11 17" fill="#fff">
      <path d="M3.40428 16.3792C2.782 16.9967 1.77308 16.9967 1.15079 16.3792C0.528511 15.7617 0.528511 14.7606 1.15079 14.1431L7.91125 7.43476C8.53354 6.81728 9.54246 6.81728 10.1647 7.43476C10.787 8.05225 10.787 9.05338 10.1647 9.67087L3.40428 16.3792Z" fill="white"/>
      <path d="M10.1647 7.43476C10.787 8.05225 10.787 9.05338 10.1647 9.67087C9.54246 10.2883 8.53355 10.2883 7.91126 9.67086L1.1508 2.96255C0.52852 2.34507 0.52852 1.34393 1.1508 0.72645C1.77309 0.108969 2.78201 0.108969 3.40429 0.72645L10.1647 7.43476Z" fill="white"/>
    </svg>
  </div>

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { contentSearchAction: { loadDefaultContent, loadPopularServices } } = this.props
    loadDefaultContent()
    loadPopularServices()
  }

  render() {
    const { intl } = this.context
    const { searchContentState: { countries, isLoading, error }, servicesState: { services }, loginState: { isAuthenticated }, screen } = this.props
    
    const settingsServices = {
      dots: false,
      speed: 250,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.2,
          },
        },
      ],
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
    }
    const settingsDestinations = {
      dots: false,
      speed: 250,
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.5,
          },
        },
      ],
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
    }

    const sortedServices = services.filter(item => item.service_sort_order !== null).sort((a, b) => a.service_sort_order - b.service_sort_order)

    return (
      <Container className={classNames.bind(styles)(styles.homeContainer, { 
        homeContainerMobile: isMobile(screen),
      })}>
        {isLoading
          ? <WithDelay waitBeforeShow={2000}><Loading/></WithDelay>
          : <Fragment>
            {error 
              ? <div>Maintenance</div>
              : <Fragment>
                <section className={styles.title}>
                  <h1>{intl.formatMessage({ id: 'page.home.start' })}</h1>
                  <div>
                    <p>{intl.formatMessage({ id: 'page.home.subTitle1' })}</p>
                    <Button
                      path={isAuthenticated ? '/countries' : '/account/join'}
                      type={ButtonType.PRIMARY}
                      className={styles.Button}
                      value={intl.formatMessage({ id: 'page.home.assessmentLink' })}
                    />
                  </div>
                </section>
                <section className={styles.start}>
                  <div className={styles.startBackground}>
                  </div>
                  <h1>{intl.formatMessage({ id: 'page.home.startTitle' })}</h1>
                  <p>{intl.formatMessage({ id: 'page.home.subTitle3' })}</p>
                </section>
                <section className={styles.services}>
                  <h1>{intl.formatMessage({ id: 'page.home.services' })}</h1>
                  <Slider {...settingsServices}>
                    {sortedServices.map((item, index) =>
                      <Link
                        className={styles.sliderItem}
                        key={index}
                        to={`/search?countryId=${item.country_id}&visaTypeId=${item.visa_type_id}`}
                      >
                        <div className={styles.backgroundOuter}>
                          <div className={styles.background} style={ { backgroundImage: `url(${item.service_logo})` }}></div>
                        </div>
                        <p className={styles.country}>{item.country_name}</p>
                        <p>{item.visa_type_name} visa</p>
                      </Link>)}
                  </Slider>
                </section>
                <section className={styles.destinations}>
                  <h1>{intl.formatMessage({ id: 'page.home.destinations' })}</h1>
                  <Slider {...settingsDestinations}>
                    {countries && countries.map((item, index) =>
                      <Link
                        className={styles.sliderDestinations}
                        key={index}
                        to={`/visa/${item.id}`}
                      >
                        <div className={styles.backgroundOuter}>
                          <div className={styles.background} style={ { backgroundImage: `url(${item.countryLogo})` }}></div>
                        </div>
                        <p className={styles.country}>{item.countryName}</p>
                      </Link>)}
                  </Slider>
                </section>
              </Fragment>}
          </Fragment>}
      </Container>
    )
  }
}

HomePage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  searchContentState: state.search.content,
  servicesState: state.search.services,
  loginState: state.auth.login,
})
const mapDispatchToProps = dispatch => ({
  contentSearchAction: bindActionCreators(contentSearchAction, dispatch),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(HomePage)))