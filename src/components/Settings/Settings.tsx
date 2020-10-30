import { Grid, makeStyles, Theme } from "@material-ui/core";
import * as React from "react";

import { Password } from "./Password";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

export const Settings: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Password />
      </Grid>
    </div>
  );
};
