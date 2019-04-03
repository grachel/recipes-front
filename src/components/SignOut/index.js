import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { withFirebase } from '../Firebase';

class SignOutButton extends MenuItem { 
  render() {
    const {event} = this.props;

    return(
      <MenuItem onClick={ () => {
        event();
        this.props.firebase.doSignOut();
      }
      }>Wyloguj</MenuItem>
    )
  }
}

export default withFirebase(SignOutButton);