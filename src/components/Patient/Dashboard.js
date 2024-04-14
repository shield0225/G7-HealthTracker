import React, { useEffect, useState } from "react";
import "./InfoArea.css";
import { Box, Grid } from "@mui/material";
import HeartAndRespirationRateChart from "./Dashboard/HeartAndRespirationRateChart";
import BloodPressureOverviewChart from "./Dashboard/BloodPressureOverviewChart";
import DiastolicBloodAverageWeeksChart from "./Dashboard/DiastolicBloodAverageWeeksChart";
import SystolicBloodAverageChart from "./Dashboard/SystolicBloodAverageChart";
import { useAuth } from "../Auth/AuthContext";

function Dashboard() {
  const [vitalSignsInformation, setVitalSignsInformation] = useState([]);
  const { fetchUserDetails } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const user = await fetchUserDetails();
      setVitalSignsInformation(user?.vitalSignsInformation || []);
    }
    fetchData();
  }, []);

  return (
    <div className="flex mt-3">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7.5}>
            <BloodPressureOverviewChart vitalSignsInformation={vitalSignsInformation} />
          </Grid>
          <Grid item xs={12} lg={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DiastolicBloodAverageWeeksChart vitalSignsInformation={vitalSignsInformation} />
              </Grid>
              <Grid item xs={12}>
                <SystolicBloodAverageChart vitalSignsInformation={vitalSignsInformation} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <HeartAndRespirationRateChart vitalSignsInformation={vitalSignsInformation} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
