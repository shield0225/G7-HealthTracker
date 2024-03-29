import React from "react";
import "./InfoArea.css";
import { Box, Grid } from "@mui/material";
import HeartAndRespirationRateChart from "./Dashboard/HeartAndRespirationRateChart";
import BloodPressureOverviewChart from "./Dashboard/BloodPressureOverviewChart";
import DiastolicBloodAverageWeeksChart from "./Dashboard/DiastolicBloodAverageWeeksChart";
import SystolicBloodAverageChart from "./Dashboard/SystolicBloodAverageChart";

function Dashboard() {
  return (
    <div className="flex mt-3">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7.5}>
            <BloodPressureOverviewChart />
          </Grid>
          <Grid item xs={12} lg={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DiastolicBloodAverageWeeksChart />
              </Grid>
              <Grid item xs={12}>
                <SystolicBloodAverageChart />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <HeartAndRespirationRateChart />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
