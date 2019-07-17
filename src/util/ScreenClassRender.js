import React, { Component } from 'react'
import { ScreenClassRender } from 'react-grid-system'

const screenClassRender = WrappedComponent => {
  class HOC extends Component {
    render() {
      return <ScreenClassRender render={screen => <WrappedComponent {...this.props} screen={screen} />} />
    }
  }
  return HOC
}

export default screenClassRender
