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

import styles from './VisaTypePage.module.css'


class VisaTypePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryName: '',
    }
  }

  componentDidMount() {
    const { contentSearchAction: { loadVisaType }, match } =  this.props
    const countryId = match.params.countryId

    loadVisaType(countryId)
  }
  
  render() {
    const { intl } = this.context
    const { countryName } = this.state
    const { screen, searchVisasState: { visas, countryId, error, isLoading } } = this.props

    return (
      <Container className={classNames.bind(styles)(styles.contentContainer, { 
        contentContainerMobile: isMobile(screen),
      })}>
        <Fragment>
          {isLoading
            ? <WithDelay waitBeforeShow={2000}><Loading/></WithDelay>
            : <Fragment>
              {error
                ? <div>Maintenance</div>
                : <div className={styles.visaContainer}>
                  <h2 className={styles.header}>{intl.formatMessage({ id: 'page.visa.title' })} - {countryName}</h2>
                  <Row justify="start" style={{ maxWidth: '798px', width: 'auto' }}>
                    {visas.map(({ id, typeName, visaTypeLogo }, index) => 
                      <Col style={{ marginBottom: '45px' }} md={12} xl={4} lg={4} key={id}
                        children={
                          <Link
                            className={styles.sliderItem}
                            key={index}
                            to={`/search?countryId=${countryId}&visaTypeId=${id}`}
                          >
                            <div className={styles.backgroundOuter}>
                              <div className={styles.background} style={ { backgroundImage: `url(${visaTypeLogo})` }}></div>
                            </div>
                            <p className={styles.country}>{typeName === 'Temporary resident' ? typeName : typeName+' visa'}</p>
                          </Link> 
                        }/>
                    )}
                  </Row>
                </div>}
            </Fragment>}
        </Fragment>
      </Container>
    )
  }
}

VisaTypePage.contextTypes = {
  intl: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  searchVisasState: state.search.visas,
})
const mapDispatchToProps = dispatch => ({
  contentSearchAction: bindActionCreators(contentSearchAction, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenClassRender(VisaTypePage)))