import React, {useState, useEffect} from 'react'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import './Auth.css'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
const Auth = props => {
    const [authForm, setAuthForm] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Email'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
              },
              password: {
                elementType: 'input',
                elementConfig: {
                  type: 'password',
                  placeholder: 'Password'
                },
                value: '',
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
              }
        })
        const [isSignup, setIsSignup] = useState(true)
    
    useEffect(() => {
      if(!props.buildingCake && props.authRedirectPath !== '/') {
        props.onSetAuthRedirectPath()
      }
    }, [])

    const checkValidility = (value, rules) => {
        let isValid = true
        if(rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
        if(rules.equalLength) {
            isValid = value.length === 5 && isValid;
          }
        if(rules.minLength){
            isValid = value.length > 5 && isValid;
          }
        if(rules.minLengthPhone) {
          isValid = value.length >= 9 && isValid;
        }
        if(rules.maxLengthPhone) {
          isValid = value.length  <= 10 && isValid;
        }
        return isValid
      }

      const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidility(event.target.value, authForm[controlName].validation),
                touched: true
            }
        }
        setAuthForm(updatedControls)
      }

      const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(authForm.email.value, authForm.password.value, isSignup)
      }

      const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
      }

        const formElementsArray = []
        for(let key in authForm) {
          formElementsArray.push({
            id: key,
            config: authForm[key]
          })
        }
        let form =  formElementsArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate=  {formElement.config.validation}
                touched= {formElement.config.touched}
                changed = {(event) => inputChangeHandler(event, formElement.id)}
            />
        ))

            if(props.loading) {
                form = <Spinner />
            }


            let errorMessage =  null
            if(props.error) {
                errorMessage = props.error.message
                
                console.log(errorMessage)
            }
           
            let authRedirect = null
            if(props.isAuthenticated) {
              authRedirect = <Redirect to={props.authRedirectPath} />
            }

        return(
            <div className="Auth">
               {authRedirect}
                <p>{errorMessage}</p> 
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={switchAuthModeHandler}
                    >SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
            </div>
 
        )
    }
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingCake: state.cakeBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
}
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)