import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: "100%",
  },
  content: {
    height: "100%",
  },
}));

export interface MinimalProps {
  children?: any;
  className?: string;
}

export const Minimal: React.FC<MinimalProps> = (props: MinimalProps) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Topbar/> */}
      <main className={classes.content}>{children}</main>
    </div>
  );
};
