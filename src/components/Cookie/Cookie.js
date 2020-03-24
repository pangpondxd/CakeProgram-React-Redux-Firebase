
import React from 'react';
import classes from './Cookie.css';
import CookieIngredient from './CookieIngredient/CookieIngredient';
const Cookie = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <CookieIngredient key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(transformedIngredients.length===0){
        transformedIngredients = <div>Please start adding ingredients</div>
    }
    return (
        <div className="Cookie">
        <CookieIngredient type="cookie-top" />
        {transformedIngredients}
        <CookieIngredient type="cookie-bottom" />
        </div>
    )
}

export default Cookie