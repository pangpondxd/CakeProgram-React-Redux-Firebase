import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'
const NavigationItems = (props) => (
    <ul className="NavigationItems">
       <NavigationItem link="/" exact>Cake Builder</NavigationItem>
       { props.isAuthenticated 
       ? <NavigationItem link="/orders">Orders</NavigationItem> 
       : null }
       { !props.isAuthenticated 
       ? <NavigationItem link="/auth">SIGNIN</NavigationItem>
       :  <NavigationItem link="/logout">SIGNOUT</NavigationItem>
       }
    </ul>
)

export default NavigationItems