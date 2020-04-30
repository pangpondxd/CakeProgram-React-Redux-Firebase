import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Aux from "../Aux/Aux";
import "./Layout.css";
import { connect } from 'react-redux'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClosedHandle = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandle} />
        <SideDrawer
        isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandle}
        />
        <main className="Content">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return  {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
