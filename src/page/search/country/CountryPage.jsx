import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import classNames from 'classnames/bind'

import Loading from '../../../common/components/loading/Loading'

import ScreenClassRender from '../../../util/ScreenClassRender'
import { isMobile } from '../../../util/responsive'
import WithDelay from '../../../util/WithDelay'

import * as contentSearchAction from '../../../action/user/ContentSearchAction'

import styles from './CountryPage.module.css'

class CountryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.contentSearchAction.loadDefaultContent()
  }

  render() {
    const { intl } = this.context
    const { screen, searchContentState: { countries, isLoading, error } } = this.props

    return (
      <Container className={classNames.bind(styles)(styles.contentContainer, { 
        contentContainerMobile: isMobile(screen),
      })}>
        {isLoading ? (
          <WithDelay waitBeforeShow={2000}>
            <Loading/>
          </WithDelay>
        ) : (
          <Fragment>
            {error ? (
              <div>Maintenance</div>
            ) : (
              <Fragment>
                <div className={styles.countyContainer}>
                  <h2 className={styles.header}>{intl.formatMessage({ id: 'page.home.header' })}</h2>
                  <Row justify="start">
                    {countries && countries.map(({ id, countryName, countryLogo }, index) => 
                      <Col
                        style={{ marginBottom: '24px' }}
                        md={12}
                        xl={4}
                        lg={4}
                        key={index}
                        children={
                          <Link className={styles.countryContainer} key={index} to={`/visa/${id}`}>
                            <div className={styles.background} style={ { backgroundImage: `url(${countryLogo})` }}></div>
                            <p className={styles.country}>{countryName}</p>
                          </Link>
                        }/>
                    )}
                  </Row>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </Container>
    )
  }
}

CountryPage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  searchContentState: state.search.content,
})
const mapDispatchToProps = dispatch => ({
  contentSearchAction: bindActionCreators(contentSearchAction, dispatch),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(CountryPage)))