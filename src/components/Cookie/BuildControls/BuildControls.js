import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
];
const buildControls = (props) => (
    <div className="BuildControls">
       {controls.map(ctrl => (
           <BuildControl 
           key={ctrl.label} 
           label={ctrl.label} 
           added={() => props.ingredientAdded(ctrl.type)}
           />
       ))}
    </div>
)
export default buildControls