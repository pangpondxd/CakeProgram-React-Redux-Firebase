import React, { Component } from "react";
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
class CakeBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasing: false
  };
  componentDidMount() {
    console.log(this.props)
    this.props.onInitIngredients()
  
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0
  }

  

  purchaseHandle = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }
    else {
      this.props.history.push('/auth')
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    
let cake = this.props.error ? <p>Ingredients can't loaded</p> : <Spinner /> ;
if(this.props.ings){
    cake = (
        <Aux>
          <Cake ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandle}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = 
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {cake}
      </Aux>
    );
  }
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
    onInitPurchase: () => dispatch(cakeBuilderActions.purchaseInit())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(CakeBuilder, axios));