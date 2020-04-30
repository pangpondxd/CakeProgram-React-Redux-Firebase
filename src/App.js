import React, {useEffect} from 'react';
import './index.css';
import Layout from './hoc/Layout/Layout'
import CakeBuilder from './containers/CakeBuilder/CakeBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter } from 'react-router-dom' 
import Orders from './containers/Orders/Orders'
import Auth from './containers/Orders/Auth/Auth.js'
import Logout from './containers/Orders/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

const App = props =>  {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [])
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
          <Route path="/" exact component={CakeBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }

  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(App));
