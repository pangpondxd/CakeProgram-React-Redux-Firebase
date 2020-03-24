import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Cookie from '../../components/Cookie/Cookie'
class CookieBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:{
            salad:0,
            cheese:0
        }
    }
    render () {
        return (
            <Aux>
                <div>Hello world</div>
                <Cookie ingredients={this.state.ingredients} />
                <div>Build Control</div>
            </Aux>
        )
    }
}

export default CookieBuilder