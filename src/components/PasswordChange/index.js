import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    case 'auth/requires-recent-login':
      return "Sesja wygasła. Zaloguj się ponownie."  
    case 'auth/weak-password':
      return "Podane hasło jest zbyt słabe"
    default:
      return errorCode
  }
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.service
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
      
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <h1>Zmiana hasła</h1><br />           
            <TextField
              id="standard-password-input"
              label="Nowe hasło"
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
              label="Powtórz nowe hasło"
              name="passwordTwo"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.onChange}
              margin="normal"
              value={passwordTwo}
            /><br />        
            <Button type="submit" disabled={isInvalid} variant="contained" color="primary" className={classes.button}>
              Zmień hasło
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

const PasswordChangeLink = () => (
  <Typography variant="body1" gutterBottom>
    <Link to={ROUTES.PASSWORD_CHANGE}>Zmień hasło</Link>
  </Typography>
);

const PasswordChangePage = compose(
  withService,
  withStyles(styles),
)(PasswordChangeForm);

export default PasswordChangePage;

export { PasswordChangeLink };