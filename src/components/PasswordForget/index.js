import React, { useState, useContext } from 'react';
import { compose } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';

import { ServiceContext } from '../Service';
import { styles } from './styles';
import { errorMessage } from '../../constants/helper';

function PasswordForgetFormBase(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const service = useContext(ServiceContext.Consumer);
  const { classes } = props;
  const isInvalid = email === '';

  function onSubmit(event) {
    service
      .doPasswordReset(email)
      .then(() => {
        setEmail('');
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
          <h1>Przypomnienie hasła</h1><br />           
          <TextField
            id="standard-name"
            label="E-Mail"
            className={classes.textField}
            value={email}
            name="email"
            onChange={ev => setEmail(ev.target.value)}
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

const PasswordForgetPage = compose(
  withStyles(styles),
)(PasswordForgetFormBase);

export default PasswordForgetPage;

export { PasswordForgetPage };