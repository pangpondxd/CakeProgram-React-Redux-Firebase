import React, { useState } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Aux from "../Aux/Aux";
import "./Layout.css";
import { connect } from 'react-redux'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const Layout = props => {
  const [sideDrawerIsVisible, setsideDrawerIsVisible] = useState(false)
  const sideDrawerClosedHandle = () => {
    setsideDrawerIsVisible(false)
  };
  const sideDrawerToggleHandle = () => {
    setsideDrawerIsVisible(!sideDrawerIsVisible)
  };
    return (
      <Aux>
        <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandle} />
        <SideDrawer
        isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandle}
        />
        <main className="Content">{props.children}</main>
      </Aux>
    );
}

const mapStateToProps = state => {
  return  {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
