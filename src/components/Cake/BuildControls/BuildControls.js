import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Chocolate', type: 'chocolate'},
    {label: 'Strawberry', type: 'strawberry'},
    {label: 'Blueberry', type: 'blueberry'},
    {label: 'Vanilla', type: 'vanilla'},
    {label: 'Lemon', type: 'lemon'},
    {label: 'Orange', type: 'orange'},
];
const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price: {props.price}</p>
       {controls.map(ctrl => (
           <BuildControl 
           key={ctrl.label} 
           label={ctrl.label} 
           added={() => props.ingredientAdded(ctrl.type)}
           removed={() => props.ingredientRemoved(ctrl.type)}
           disabled={props.disabled[ctrl.type]}
           />
       ))}
       <button 
       onClick={props.ordered}
       disabled={!props.purchasable}>ORDER NOW</button>
    </div>
)
export default buildControls