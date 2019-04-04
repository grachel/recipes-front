import React from 'react';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { withAuthorization } from '../Session';
import { withService } from '../Service';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
});

class UserGreetingBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: null };
  }

  componentDidMount() {
    const { service, authUser } = this.props;

    this.setState({
      username: ''
    }, () => {
      service.user(authUser.uid)
        .then(user => {
          this.setState({username: user.username})
        })
    })
  }

  render() {
    const { username } = this.state;
    const { classes } = this.props;

    return (
      <Typography variant="subtitle1" color="inherit" className={classes.grow}>
        Cześć, {username}
      </Typography>
    )
  }
}


const condition = authUser => !!authUser;

const UserGreeting = compose(
  withService,
  withAuthorization(condition),
  withStyles(styles),
)(UserGreetingBase);

export default UserGreeting;
