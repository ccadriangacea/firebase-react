import * as React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  grid: {
    flexGrow: 1,
    padding: spacing(2),
  },
}));

export const GridContainer: React.FC = (props) => {
  const classes = useStyles();
  const { children, ...rest } = props;

  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};
