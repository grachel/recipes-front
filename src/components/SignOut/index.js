import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { withService } from '../Service';

function SignOutButton(props) {
  const { event } = props;
  return (
    <MenuItem onClick={() => {
      event();
      props.service.doSignOut();
    }
    }>Wyloguj</MenuItem>
  )
}

export default withService(SignOutButton);