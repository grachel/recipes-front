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
  email: '',
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
    case 'auth/user-not-found':
      return "Użytkownik o podanym adresie nie istnieje"
    case 'auth/invalid-email':
      return "Adres e-mail jest nieprawidłowy"
    default:
      return errorCode
  }
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.service
      .doPasswordReset(email)
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
    const { email, error } = this.state;
    
    const { classes } = this.props;

    const isInvalid = email === '';

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.onSubmit}>
            <h1>Przypomnienie hasła</h1><br />           
            <TextField
              id="standard-name"
              label="E-Mail"
              className={classes.textField}
              value={email}
              name="email"
              onChange={this.onChange}
              margin="normal"
            /> <br />         
            <Button type="submit" disabled={isInvalid} variant="contained" color="primary" className={classes.button}>
              Zresetuj hasło
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

const PasswordForgetLink = () => (
  <Typography variant="body1" gutterBottom>
    <Link to={ROUTES.PASSWORD_FORGET}>Nie pamiętam hasła</Link>
  </Typography>
);

const PasswordForgetPage = compose(
  withService,
  withStyles(styles),
)(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetLink };