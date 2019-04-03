import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    padding: theme.spacing.unit * 2,
    ali: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '30%',
    display: 'block',
    margin: 'auto',
    marginTop: '5%'
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function errorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return "Nie prawidłowy adres e-mail"
    case 'auth/user-disabled':
      return "Użytkownik nieaktywny"
    case 'auth/user-not-found':
      return "Nie znaleziono użytkownika"
    case 'auth/wrong-password':
      return "Nie prawidłowe hasło"
    default:
      return errorCode
  }
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const { classes } = this.props;
    const isInvalid = password === '' || email === '';

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <h1>Logowanie</h1><br />
            <TextField
              id="standard-name"
              label="E-Mail"
              className={classes.textField}
              value={email}
              name="email"
              onChange={this.onChange}
              margin="normal"
            /> <br />
            <TextField
              id="standard-password-input"
              label="Hasło"
              name="password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.onChange}
              margin="normal"
            /><br />
            <Button type="submit" disabled={isInvalid} variant="contained" color="primary" className={classes.button}>
              Zaloguj się
            </Button><br />
            {
              error &&
              <Chip
                avatar={
                  <Avatar>
                    <ErrorIcon />
                  </Avatar>
                }
                label={errorMessage(error.code)}
                onDelete={() => this.setState({ error: false })}
                className={classes.chip}
                color="secondary"
              />
            }
            <PasswordForgetLink />
            <SignUpLink />
          </form>
        </Paper>
      </div>
    );
  }
}

SignInFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const SignInPage = compose(
  withRouter,
  withFirebase,
  withStyles(styles),
)(SignInFormBase);

export default SignInPage;