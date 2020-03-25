import React, { Component } from 'react';
import './CakeIngredient.css';
import PropTypes from 'prop-types';
class CakeIngredient extends Component  {
    render (){
    let ingredient = null;

    switch (this.props.type) {
        case ('cake-bottom'):
        ingredient = <div className="CakeBottom" />;
        break;
        case ('cake-top'):
        ingredient = (
            <div className="CookieTop">
            <div className="Cream1" />
            <div className="Cream2" />
            </div>
        );
        break;
        case('chocolate'):
        ingredient = <div className="Chocolate" /> ;
        break;
        case('strawberry'):
        ingredient = <div className="Strawberry" />;
        break;
        case('blueberry'):
        ingredient = <div className="Blueberry" />;
        break;
        case('vanilla'):
        ingredient = <div className="Vanilla" />;
        break;
        case('lemon'):
        ingredient = <div className="Lemon" />;
        break;
        case('orange'):
        ingredient = <div className="Orange" />;
        break;
        default:
            ingredient = null;
    }
    return ingredient;
}
}
CakeIngredient.propTypes = {
    type: PropTypes.string.isRequired
};
export default CakeIngredient;