import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import { ErrorPayload } from "../../redux/reducer/appRootReducer";
import { getErrorPayload } from "../../redux/selector/errorSelectors";

import { NotFound } from ".";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginLeft: "20px",
    marginTop: "20px",
    display: "inline-block",
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));

export const Error: React.FC = () => {
  const errorPayload: ErrorPayload = useSelector(getErrorPayload);

  const errorComponent = () => {
    switch (errorPayload) {
      case 404:
        return NotFound;
      default:
        return CommonError;
    }
  };

  return (
    <div>
      <p>
        Error: {errorPayload.error} / Code: {errorPayload.code}
      </p>
      {errorComponent}
    </div>
  );
};

export const CommonError: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.paper} />
            <Paper className={classes.paper} />
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
