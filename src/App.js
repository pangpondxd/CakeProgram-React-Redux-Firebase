import React from 'react';
import './index.css';
import Layout from './hoc/Layout/Layout'
import CakeBuilder from './containers/CakeBuilder/CakeBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom' 
import Orders from './containers/Orders/Orders'
import Auth from './containers/Orders/Auth/Auth.js'
import Logout from './containers/Orders/Auth/Logout/Logout'
const App = props =>  {
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
export default App;
