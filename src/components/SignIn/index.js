import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'recompose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

import { ServiceContext } from '../Service';
import * as ROUTES from '../../constants/routes';
import { styles } from './styles';
import { errorMessage } from '../../constants/helper';

function SignInFormBase(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const service = useContext(ServiceContext.Consumer);
  const { classes } = props;
  const isInvalid = password === '' || email === '';

  function onSubmit(event) {
    service
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError(null);
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={onSubmit}>
          <h1>Logowanie</h1><br />
          <TextField
            id="standard-name"
            label="E-Mail"
            className={classes.textField}
            value={email}
            name="email"
            onChange={ev => setEmail(ev.target.value)}
            margin="normal"
          /> <br />
          <TextField
            id="standard-password-input"
            label="Hasło"
            name="password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={ev => setPassword(ev.target.value)}
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
              onDelete={() => setError(null)}
              className={classes.chip}
              color="secondary"
            />
          }
          <Typography variant="body1" gutterBottom>
            <Link to={ROUTES.PASSWORD_FORGET}>Nie pamiętam hasła</Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nie posiadasz konta? <Link to={ROUTES.SIGN_UP}>Zarejestruj się</Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

const SignInPage = compose(
  withRouter,
  withStyles(styles),
)(SignInFormBase);

export default SignInPage;