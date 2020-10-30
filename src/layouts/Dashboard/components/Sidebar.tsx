import { Drawer, Theme, List, ListItem, ListItemIcon, ListItemText, makeStyles, useMediaQuery } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import { routes } from "../../../app/routes";
import theme, { closedDrawerWidth, drawerWidth } from "../../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: closedDrawerWidth,
  },
  bottomDrawerList: {
    width: "inherit",
    position: "absolute",
    bottom: "0",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export const Sidebar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const firebase = useFirebase();

  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"), { defaultMatches: true });

  function handleHome() {
    history.push(routes.landing.path);
  }

  function handleSettings() {
    history.push(routes.settings.path);
  }

  function handleProfile() {
    history.push(routes.account.path);
  }

  function handleLogout() {
    firebase.auth().signOut();
    history.push(routes.landing.path);
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isDesktop,
        [classes.drawerClose]: !isDesktop,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDesktop,
          [classes.drawerClose]: !isDesktop,
        }),
      }}
      anchor="left"
      open={isDesktop}
    >
      <div className={classes.toolbar} />

      <List>
        <ListItem button onClick={handleHome}>
          <ListItemIcon>
            {" "}
            <HomeIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
      </List>

      <List className={classes.bottomDrawerList}>
        <ListItem button onClick={handleSettings}>
          <ListItemIcon>
            {" "}
            <SettingsIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
        <ListItem button onClick={handleProfile}>
          <ListItemIcon>
            {" "}
            <PersonIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            {" "}
            <ExitToAppIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Drawer>
  );
};
