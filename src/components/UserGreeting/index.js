import React, { useState, useEffect, useContext } from 'react';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { withAuthorization } from '../Session';
import { ServiceContext } from '../Service';
import { styles } from './styles';

function UserGreetingBase(props) {
  const [username, setUsername] = useState(null);
  const service = useContext(ServiceContext);
  const { authUser, classes } = props;

  useEffect(() => {
    service.user(authUser.uid).once("value", data => {
      setUsername(data.val().username);
    });
  }, [])

  return (
    <Typography variant="subtitle1" color="inherit" className={classes.right}>
      Cześć, {username}
    </Typography>
  )
}

const condition = authUser => !!authUser;

const UserGreeting = compose(
  withAuthorization(condition),
  withStyles(styles),
)(UserGreetingBase);

export default UserGreeting;
