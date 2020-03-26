import React from 'react'
import cakeLogo from '../../assets/images/dukdui.png'
import './Logo.css'
const Logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={cakeLogo} alt="myDukdui" />
    </div>
)

export default Logo