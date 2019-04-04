import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

import { withService } from '../Service';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
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
    case 'auth/email-already-in-use':
      return "Użytkownik o podanym adresie już istnieje"
    case 'auth/invalid-email':
      return "Adres e-mail jest nieprawidłowy"
    case 'auth/weak-password':
      return "Podane hasło jest zbyt słabe"
    default:
      return errorCode
  }
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.service
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.service
          .createUser(authUser.user.uid, username, email)         
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <h1>Rejestracja</h1><br />
            <TextField
              id="standard-name"
              label="Nazwa użytkownika"
              className={classes.textField}
              value={username}
              name="username"
              onChange={this.onChange}
              margin="normal"
            /> <br />
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
              name="passwordOne"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.onChange}
              margin="normal"
              value={passwordOne}
            /><br />
            <TextField
              id="standard-password-input"
              label="Powtórz hasło"
              name="passwordTwo"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.onChange}
              margin="normal"
              value={passwordTwo}
            /><br />
            <Button type="submit" disabled={isInvalid} variant="contained" color="primary" className={classes.button}>
              Zarejestruj się
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
          </form>
        </Paper>
      </div>
    );
  }
}

const SignUpLink = () => (
  <Typography variant="body1" gutterBottom>
    Nie posiadasz konta? <Link to={ROUTES.SIGN_UP}>Zarejestruj się</Link>
  </Typography>
);

const SignUpPage = compose(
  withRouter,
  withService,
  withStyles(styles),
)(SignUpFormBase);

export default SignUpPage;

export { SignUpLink };
