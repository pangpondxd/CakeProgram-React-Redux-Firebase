import React from 'react'
import './Buildcontrol.css'
const buildControl = (props) => (
    <div>
        <div className="Label">{props.label}</div>
        <button className="Less">Less</button>
        <button className="More" onClick={props.added}>More</button>
        <br />
        <br />
        <br />
        <br />

    </div>
);

export default buildControl