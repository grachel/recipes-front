import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddIcon from "@material-ui/icons/Add";
import PhotoIcon from "@material-ui/icons/Photo";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import SignOutButton from "../SignOut";
import UserGreeting from "../UserGreeting";
import { styles } from './styles';

export function NavigationBase(props){
  const [anchor, setAnchor] = useState(null);
  const { classes } = props;
  const open = Boolean(anchor);

  function handleMenu(event) {
    setAnchor(event.currentTarget);
  };

  function handleClose() {
    setAnchor(null);
  };

  function onHomeClick(){
    props.history.push(ROUTES.HOME);
  };

  function onAddClick(){
    props.history.push(ROUTES.ADD);
  };

  function onPhotoClick(){
    props.history.push(ROUTES.PHOTO);
  };

  function onPwChangeClick(){
    handleClose();
    props.history.push(ROUTES.PASSWORD_CHANGE);
  };

  function onLoginClick(){
    props.history.push(ROUTES.SIGN_IN);
  };

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={onHomeClick}
              >
                {/* Home Icon */}
                <SvgIcon className={classes.icon}>
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </IconButton>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Dodaj"
                onClick={onAddClick}
              >
                <AddIcon className={classes.icon} />
              </IconButton>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Zapisane"
                onClick={onPhotoClick}
              >
                <PhotoIcon className={classes.icon} />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
              >
                Przepisy
              </Typography>
              {authUser && <UserGreeting />}
              <div className={classes.sectionDesktop}>
                {authUser ? (
                  <div>
                    <IconButton
                      aria-owns={open ? "menu-appbar" : undefined}
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={onPwChangeClick}>
                        Zmień hasło
                      </MenuItem>
                      <SignOutButton event={handleClose}>
                        Wyloguj
                      </SignOutButton>
                    </Menu>
                  </div>
                ) : (
                    <Button color="inherit" onClick={onLoginClick}>
                      Zaloguj się
                  </Button>
                  )}
              </div>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const Navigation = compose(
  withRouter,
  withStyles(styles)
)(NavigationBase);

export default Navigation;

export { Navigation };
