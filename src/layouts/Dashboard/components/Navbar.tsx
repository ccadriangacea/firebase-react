import React from "react";
import { AppBar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
  },
}));

export const Navbar: React.FC = () => {
  const classes = useStyles();

  return <AppBar className={classes.appBar}></AppBar>;
};
