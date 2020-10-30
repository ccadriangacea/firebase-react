import { Grid } from "@material-ui/core";
import * as React from "react";

import theme, { useGridStyles } from "../../theme";
import { GridContainer } from "../Grid";

import { AccountDetails } from "./AccountDetails";
import { AccountProfile } from "./AccountProfile";

export const Account: React.FC = () => {
  const gridStyle = useGridStyles(theme);

  return (
    <GridContainer>
      <Grid item className={gridStyle.gridItem} xs={12} md={6} lg={6} xl={4}>
        <AccountProfile />
      </Grid>
      <Grid item className={gridStyle.gridItem} xs={12} md={6} lg={6} xl={4}>
        <AccountDetails />
      </Grid>
    </GridContainer>
  );
};
