import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { RefObject } from "react";

import { container, drawerWidth, transition } from "../../theme";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "70px",
    padding: "0px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "70px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export const Dashboard: React.FC = (props) => {
  const { children } = props;

  const classes = useStyles();

  const mainPanel: RefObject<any> = React.createRef();

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar />
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
        </div>
      </div>
    </div>
  );
};
