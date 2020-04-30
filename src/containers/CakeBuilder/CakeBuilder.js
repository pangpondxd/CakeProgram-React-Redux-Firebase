import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux/Aux";
import Cake from "../../components/Cake/Cake";
import BuildControls from "../../components/Cake/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Cake/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux'
import * as cakeBuilderActions from '../../store/actions/index'
import axios from '../../axios-orders'
const CakeBuilder = props => {
  // constructor(props) {
  //     super(props);
  //     state = {...}
  // }
  const [ purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0
  }

  

  const purchaseHandle = () => {
    if(props.isAuthenticated){
      setPurchasing(true)
    }
    else {
      props.onSetRedirectPath('/checkout')
      props.history.push('/auth')
    }
    
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  };

    const disabledInfo = {
      ...props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    
let cake = props.error ? <p>Ingredients can't loaded</p> : <Spinner /> ;
if(props.ings){
    cake = (
        <Aux>
          <Cake ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            price={props.price}
            purchasable={updatePurchaseState(props.ings)}
            ordered={purchaseHandle}
            isAuthenticated={props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = 
        <OrderSummary
          ingredients={props.ings}
          price={props.price}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
    }
    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {cake}
      </Aux>
    );
  }

const mapStateToProps = state => {
  return {
    ings: state.cakeBuilder.ingredients,
    price: state.cakeBuilder.totalPrice,
    error: state.cakeBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(cakeBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(cakeBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(cakeBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(cakeBuilderActions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(cakeBuilderActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(CakeBuilder, axios));