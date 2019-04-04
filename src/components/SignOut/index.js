import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { withService } from '../Service';

class SignOutButton extends MenuItem { 
  render() {
    const {event} = this.props;

    return(
      <MenuItem onClick={ () => {
        event();
        this.props.service.doSignOut();
      }
      }>Wyloguj</MenuItem>
    )
  }
}

export default withService(SignOutButton);