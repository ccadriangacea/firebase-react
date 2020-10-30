import { Avatar, Button, Card, CardActions, CardContent, Divider, Hidden, LinearProgress, Theme, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

import theme from "../../theme";
import { getUser } from "../../redux/selector/firebaseSelectors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  locationText: {},
  dateText: {},
}));

export interface AccountProfileProps {
  className?: string;
}

export const AccountProfile: React.FC<AccountProfileProps> = (props: AccountProfileProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const user = useSelector(getUser);

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), { defaultMatches: true });
  const titleSize = isDesktop ? "h2" : "h5";

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
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
          <Hidden mdDown>
            <Avatar className={classes.avatar} src={user.auth.photoURL} />
          </Hidden>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};
