import { Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { routes } from "../../app/routes";
import { getFirebaseAuth } from "../../redux/selector/firebaseSelectors";

const useStyles = makeStyles(() => ({
  root: {},
  divider: {
    margin: "1rem",
  },
  space: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  spaceTop: {
    marginTop: "1rem",
  },
  spaceBottom: {
    marginBottom: "1rem",
  },
}));

export interface PasswordProperties {
  className?: string;
}

export const Password: React.FC<PasswordProperties> = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const firebase = useFirebase();
  const history = useHistory();

  const firebaseAuth = useSelector(getFirebaseAuth);

  const [values, setValues] = useState({
    code: "",
    password: "",
    confirm: "",
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetPassword = () => {
    firebase
      .resetPassword(firebaseAuth.email)
      .then(() => {
        firebase.auth().signOut();
        history.push(routes.signIn.path);
      })
      .catch((error) => console.error("Reset password error: ", error));
  };

  const handleUpdatePassword = () => {
    firebase
      .confirmPasswordReset(values.code, values.confirm)
      .then((uid) => console.log("update done for user: " + uid))
      .catch((error) => console.error("error on password update: " + error));
  };

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={6} xl={4}>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form>
            <CardHeader title="Reset password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography className={classes.space} variant="body1">
                    Ask Firebase to change my Password:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Button className={classes.spaceBottom} color="primary" variant="contained" onClick={resetPassword}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <Divider className={classes.divider} />
      <Grid item xs={12} md={6} lg={6} xl={4}>
        <Card {...rest} className={clsx(classes.root, className)}>
          <form>
            <CardHeader title="Update password" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography className={classes.spaceTop} variant="body1">
                    Use code from email to set a new password:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <TextField
                    fullWidth
                    className={classes.spaceBottom}
                    label="Code"
                    name="code"
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    className={classes.spaceBottom}
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    className={classes.spaceBottom}
                    label="Confirm password"
                    name="confirm"
                    onChange={handleChange}
                    type="password"
                    value={values.confirm}
                    variant="outlined"
                  />
                  <Button color="primary" variant="contained" onClick={handleUpdatePassword}>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </React.Fragment>
  );
};
