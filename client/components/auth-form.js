import React from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },

  style: {
    width:'100%',
    margin: '20px',
    borderColor: '#ef6c00',
    backgroundColor: '#ff9800',
    color: 'white'
  }
});

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const { classes } = props;
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} name={name}>
        <TextField
            label htmlFor="email" 
            id="simple-start-adornment"
            className={classNames(classes.margin, classes.textField)}
            name = "email"
            type = "email"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">Email</InputAdornment>,
            }}
          />
        <TextField
            label htmlFor="password" 
            id="simple-start-adornment"
            className={classNames(classes.margin, classes.textField)}
            name = "password"
            type = "password"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">Password</InputAdornment>,
            }}
          />
          <div><button type="submit">{displayName}</button></div>
          <div className={classes.style}>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(withStyles(styles)(AuthForm));
export const Signup = connect(mapSignup, mapDispatch)(withStyles(styles)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
