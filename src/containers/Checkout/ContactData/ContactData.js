import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        phone: '',
        landmark: '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)
          this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Tanawat",
        address: {
          street: "vichitsongkram",
          zipcode: "83120",
          country: "Thailand"
        },
        email: "webmaster.tanawat@gmail.com",
        telephone: "0658678035"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({ loading: false });
    })
}
    render() {
        let form = (<form>
            <input className="input" type="text" name="name" placeholder="Your Name" /> <br/>
            <input className="input" type="email" name="name" placeholder="Your Email" /> <br/>
            <input className="input" type="text" name="street" placeholder="Street" /> <br/>
            <input className="input" type="text" name="postal" placeholder="postal" /> <br/>
            <input className="input" type="number" name="phone" placeholder="Your Phone-Number" /> <br/>
            <input className="input" type="text" name="landmark" placeholder="สถานที่ใกล้เคียง/ landmark around your address" /> <br/>
            <Button className="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }
        
        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        )
    }
}

export default ContactData