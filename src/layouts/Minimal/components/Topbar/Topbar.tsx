import { AppBar, Theme, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  appBar: {
    backgroundColor: theme.palette.primary.main
  },
  signIn: {
    color: "white",
    textDecoration: "none",
    alignSelf: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}));

export interface TopbarProps {
  className?: string
};

export const Topbar: React.FC<TopbarProps> = (props: TopbarProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <Link to='/'>
          <img
            alt="Logo"
            src="/images/logos/logo.svg"
            height="40%"
            width="40%"
            object-fit="contain"
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};
