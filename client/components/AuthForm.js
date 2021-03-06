import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className='ex'>
    <div className='login'>
      <div>
      <form onSubmit={handleSubmit} name={name} className='form'>
        <div>
          <label htmlFor="username" className='label'>
            <small>Username</small>
          </label>
          <input name="username" type="text" className='inputs'/>
        </div>
        <div>
          <label htmlFor="password" className='label'>
            <small>Password</small>
          </label>
          <input name="password" type="password" className='inputs'/>
        </div>
        {name === "signup" ? (
          <div>
          <label htmlFor="email" className='label'>
            <small>Email</small>
          </label>
          <input name="email" type="email" className='inputs'/>
        </div>
        ) : ''}
        {name === 'login' ? (
          <p>
          <Link to='/signup'>
          Don't have an account? Sign up!
          </Link>
        </p>
        ) : ''}
        <div>
          <button className="form-button" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      </div>
    </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      if (evt.target.name === 'login') {
        evt.preventDefault()
        const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        dispatch(authenticate(username, password, formName))

      } else {
        evt.preventDefault()
        const formName = evt.target.name
        const username = evt.target.username.value
        const password = evt.target.password.value
        const email = evt.target.email.value
        dispatch(authenticate(username, password, formName, email))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
