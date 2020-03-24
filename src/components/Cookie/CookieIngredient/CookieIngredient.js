import React, { Component } from 'react';
import classes from './CookieIngredient.css';
import PropTypes from 'prop-types';
class CookieIngredient extends Component  {
    render (){
    let ingredient = null;

    switch (this.props.type) {
        case ('cookie-bottom'):
        ingredient = <div className="CookieBottom" />;
        break;
        case ('cookie-top'):
        ingredient = (
            <div className="CookieTop">
            <div className="Cream1" />
            <div className="Cream2" />
            </div>
        );
        break;
        case('cheese'):
        ingredient = <div className="Cheese" /> ;
        break;
        case('salad'):
        ingredient = <div className="Salad" />;
        break;
        default:
            ingredient = null;
    }
    return ingredient;
}
}
CookieIngredient.propTypes = {
    type: PropTypes.string.isRequired
};
export default CookieIngredient;