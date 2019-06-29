import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import UserGreeting from '../UserGreeting';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 10,
    width: '70%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class NavigationBase extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onHomeClick = () => {
    this.props.history.push(ROUTES.HOME);
  };

  onAddClick = () => {
    this.props.history.push(ROUTES.ADD);
  };

  onPwChangeClick = () => {
    this.handleClose();
    this.props.history.push(ROUTES.PASSWORD_CHANGE);
  };

  onLoginClick = () => {
    this.props.history.push(ROUTES.SIGN_IN);
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.onHomeClick}>
                  <HomeIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Dodaj" onClick={this.onAddClick}>
                  <AddIcon className={classes.icon} />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Przepisy
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Szukaj"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
                <div className={classes.grow} />
                {
                  authUser && <UserGreeting />
                }
                <div className={classes.sectionDesktop}>
                  {
                    authUser ?
                      <div>
                        <IconButton
                          aria-owns={open ? 'menu-appbar' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          color="inherit" >
                          <AccountCircle />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={open}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.onPwChangeClick}>Zmień hasło</MenuItem>
                          <SignOutButton event={this.handleClose}>Wyloguj</SignOutButton>
                        </Menu>
                      </div> :
                      <Button color="inherit" onClick={this.onLoginClick}>Zaloguj się</Button>
                  }
                </div>
              </Toolbar>
            </AppBar>
          </div>
        )}
      </AuthUserContext.Consumer>);
  }
}

NavigationBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Navigation = compose(
  withRouter,
  withStyles(styles),
)(NavigationBase);

export default Navigation;

export { Navigation };