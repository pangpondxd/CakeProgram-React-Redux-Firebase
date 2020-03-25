import React from 'react'
import  './NavigationItem.css'
const NavigationItem = (props) => (
    <ul className="NavigationItem">
        <li>
            <a 
                href={props.link}
                className={props.active ? "active" : null}
                 >{props.children}
            </a>
        </li>
    </ul>
)

export default NavigationItem