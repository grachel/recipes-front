import React, { useState } from 'react';
import { compose } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

import { withService } from '../Service';
import { styles } from './styles';
import { errorMessage } from "../../constants/helper.js";

export function PasswordChangeForm(props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { classes } = props;
  const isInvalid = password !== confirmPassword || password === '';

  function onSubmit(event) {
    props.service
      .doPasswordUpdate(password)
      .then(() => {
        setPassword('');
        setConfirmPassword('');
        setError(null);
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
          <h1>Zmiana hasła</h1><br />
          <TextField
            id="standard-password-input"
            label="Nowe hasło"
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
            label="Powtórz nowe hasło"
            name="passwordTwo"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={ev => setConfirmPassword(ev.target.value)}
            margin="normal"
            value={confirmPassword}
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

const PasswordChangePage = compose(
  withService,
  withStyles(styles),
)(PasswordChangeForm);

export default PasswordChangePage;

export { PasswordChangePage };