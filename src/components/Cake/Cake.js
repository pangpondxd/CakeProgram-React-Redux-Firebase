
import React from 'react';
import  './Cake.css';
import CakeIngredient from './CakeIngredient/CakeIngredient'
const Cake = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <CakeIngredient key={igKey + i} type={igKey} />;
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
        <CakeIngredient type="cake-top" />
        {transformedIngredients}
        <CakeIngredient type="cake-bottom" />
        </div>
    )
}

export default Cake