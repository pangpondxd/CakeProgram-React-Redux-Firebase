import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Cake from "../../components/Cake/Cake";
import BuildControls from "../../components/Cake/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Cake/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

class CakeBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    console.log(this.props)
    axios
      .get("https://jobsphuket-dfdd9.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        this.setState({error: true})
      });
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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // //alert('You continue!')
  
    //   });
    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: 'checkout',
      search: '?' + queryString
    })
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    
let cake = this.state.error ? <p>Ingredients can't loaded</p> : <Spinner /> ;
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
    if (this.state.loading) {
        orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(CakeBuilder, axios));