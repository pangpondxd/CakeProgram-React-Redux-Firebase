import React from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Aux'
import './Layout.css'
const Layout = ( props ) => (
    <Aux>
    <Toolbar />
    <main className="Content">
        {props.children}
    </main>
    </Aux>
);
export default Layout