import { makeStyles, Typography, useMediaQuery, Grid } from "@material-ui/core";
import * as React from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import theme, { useGridStyles } from "../../theme";
import { GridContainer } from "../Grid";
import { getUser, User } from "../../redux/selector/firebaseSelectors";

const useStyles = makeStyles(({ spacing }) => ({
  cardContent: {
    width: "100%",
  },
  spacing: {
    marginTop: spacing(6),
  },
  locationText: {},
  dateText: {},
}));

export const Home: React.FC = () => {
  const classes = useStyles();
  const user: User = useSelector(getUser);

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { defaultMatches: true });
  const titleSize = isDesktop ? "h2" : "h5";

  const gridStyle = useGridStyles(theme);

  return (
    <GridContainer>
      <Grid item className={gridStyle.gridItem} xs={12} md={6} lg={3} xl={2}>
        <div>
          <Typography gutterBottom variant={titleSize}>
            {user.auth.displayName}
          </Typography>
          <Typography className={classes.locationText} color="textSecondary" variant="body1">
            {user.profile.address?.city}, {user.profile.address?.country}
          </Typography>
          <Typography className={classes.dateText} color="textSecondary" variant="body1">
            UserTime: {moment().format("hh:mm A")}
          </Typography>
        </div>
      </Grid>
    </GridContainer>
  );
};
