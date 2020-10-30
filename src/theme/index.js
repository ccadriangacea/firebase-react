import { createMuiTheme, makeStyles } from "@material-ui/core";

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export const container = {
  height: "100%",

  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
  marginRight: "auto",
  marginLeft: "auto",
};

export const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
};

export const useGridStyles = makeStyles((theme) => ({
  gridItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}));

export const drawerWidth = 180;
export const closedDrawerWidth = 60;

export default theme;
