import React from 'react';
import Cake from '../../Cake/Cake';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'
const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hop it tastes well!</h1>
      <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
        <Cake ingredients={props.ingredients} />
      </div>
      <Button className="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button className="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
