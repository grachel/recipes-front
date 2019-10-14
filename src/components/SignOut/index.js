import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { ServiceContext } from '../Service';

function SignOutButton(props) {
  const service = useContext(ServiceContext.Consumer);
  const { event } = props;
  return (
    <MenuItem onClick={() => {
      event();
      service.doSignOut();
    }
    }>Wyloguj</MenuItem>
  )
}

export default SignOutButton;