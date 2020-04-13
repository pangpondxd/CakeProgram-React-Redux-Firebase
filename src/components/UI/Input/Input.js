import React from 'react'
import './Input.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses= ["InputElement"]

    if(props.invalid) {
        inputClasses.push("Invalid")
    }

    switch (props.elementType) {
        case ('input'):
                inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed}
                />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            />;
        break;
        case ('select'):
            inputElement = (
            <select
                className={inputClasses} 
                value={props.value}
                onChange={props.changed}
                >
                    
                {props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ))}
            </select>
            );
        break;
        default:
            // inputElement = <input className={inputClasses}
            // {...props.elementConfig}  
            // value={props.value}
            //  />
            console.log('Bug!!')
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input