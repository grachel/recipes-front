import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
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

function SignUpFormBase(props) {
  const[ username, setUsername ] = useState('');
  const[ email, setEmail ] = useState('');
  const[ password, setPassword] = useState('');
  const[ confirmPassword, setConfirmPassword] = useState('');
  const[  error, setError ] = useState(null);
  const service = useContext(ServiceContext);
  const isInvalid = password !== confirmPassword || password === '' || email === '' || username === '';
  const { classes } = props;
  
  function onSubmit(event) {
    service
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return service
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={onSubmit}>
          <h1>Rejestracja</h1><br />
          <TextField
            id="standard-name"
            label="Nazwa użytkownika"
            className={classes.textField}
            value={username}
            name="username"
            onChange={ev => setUsername(ev.target.value)}
            margin="normal"
          /> <br />
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
            name="passwordOne"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={ev => setPassword(ev.target.value)}
            margin="normal"
            value={password}
          /><br />
          <TextField
            id="standard-password-input"
            label="Powtórz hasło"
            name="passwordTwo"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={ev => setConfirmPassword(ev.target.value)}
            margin="normal"
            value={confirmPassword}
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
              onDelete={() => setError(null)}
              className={classes.chip}
              color="secondary"
            />
          }
        </form>
      </Paper>
    </div>
  );
}

const SignUpPage = compose(
  withRouter,
  withStyles(styles),
)(SignUpFormBase);

export default SignUpPage;

export { SignUpPage };
