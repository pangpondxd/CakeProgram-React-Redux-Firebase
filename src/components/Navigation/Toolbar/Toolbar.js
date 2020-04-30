import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToToggle/DrawerToToggle'
const Toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo height="80%" />
        <nav className="DestopOnly">
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
)

export default Toolbar