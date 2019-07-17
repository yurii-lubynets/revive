import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import BaseContainer from './container/base/BaseContainer'
import AccountContainer from './container/auth/AccountContainer'

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Switch>
   
        <Route path="/account" component={AccountContainer}/>
        
        <Route path="/visa" component={BaseContainer}/>
        <Route path="/provider" component={BaseContainer}/>
        <Route path="/search" component={BaseContainer}/>
        
        <Route path="/user" component={BaseContainer}/>

        <Route path="/countries" component={BaseContainer}/>
        
        <Route path="/tos" component={BaseContainer}/>
        <Route path="/privacy" component={BaseContainer}/>
        <Route path="/about" component={BaseContainer}/>
        <Route path="/how-it-works" component={BaseContainer}/>
        <Route path="/donation" component={BaseContainer}/>
        <Route path="/contact-us" component={BaseContainer}/>
    
        <Route path="/error/404" component={() => <h1>404 Page Not Found</h1>}/>
        
        <Route exact path="/" component={BaseContainer}/>
        
        <Route path="*" component={() => <h1>404 Page Not Found</h1>}/>
      </Switch>
    )
  }
}
export default Routes