import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, makeStyles, TextField } from "@material-ui/core";
import clsx from "clsx";
import { useFirebase } from "react-redux-firebase";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getUser, User } from "../../redux/selector/firebaseSelectors";

const useStyles = makeStyles(() => ({
  root: {},
}));

export interface AccountDetailsProps {
  className?: string;
}

export const AccountDetails: React.FC<AccountDetailsProps> = (props: AccountDetailsProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = useSelector(getUser);
  const firebaseApp = useFirebase();

  const [values, setValues] = useState<User>(user);

  const handleChange = (event: any) => {
    let updateValue: User = { ...values };
    switch (event.target.name) {
      case "displayName": {
        updateValue = { ...values, auth: { ...values.auth, displayName: event.target.value } };
        break;
      }
      case "email": {
        updateValue = { ...values, auth: { ...values.auth, email: event.target.value } };
        break;
      }
      case "city": {
        updateValue = { ...values, profile: { ...values.profile, address: { ...values.profile.address, city: event.target.value } } };
        break;
      }
      case "country": {
        updateValue = { ...values, profile: { ...values.profile, address: { ...values.profile.address, country: event.target.value } } };
        break;
      }
    }

    setValues(updateValue);
  };

  function updateUserProfile() {
    firebaseApp.updateEmail(values.auth.email, true);

    firebaseApp.updateAuth({ displayName: values.auth.displayName, photoURL: values.auth.photoURL }, true);

    firebaseApp.updateProfile({
      address: {
        city: values.profile.address?.city,
        country: values.profile.address?.country ? values.profile.address.country : "",
      },
    });

    return;
  }

  const cities = [
    {
      value: "unknown",
      label: "-",
    },
    {
      value: "boeblingen-bw",
      label: "Böblingen",
    },
    {
      value: "sindelfingen-bw",
      label: "Sindelfingen",
    },
    {
      value: "Stuttgart-bw",
      label: "Stuttgart",
    },
  ];

  const countries = [
    {
      value: "unknown",
      label: "-",
    },
    {
      value: "germany",
      label: "Deutschland",
    },
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Display Name"
                margin="dense"
                name="displayName"
                onChange={handleChange}
                helperText="Please specify a display name"
                required
                value={values.auth.displayName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.auth.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                margin="dense"
                name="city"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.profile.address?.city}
                variant="outlined"
              >
                {cities.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.profile.address?.country}
                variant="outlined"
              >
                {countries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" onClick={updateUserProfile}>
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
