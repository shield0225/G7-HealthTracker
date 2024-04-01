import React from "react";
import Chart from "react-apexcharts";
import DashboardCard from "./DashboardCard";
import useWeeklyDate from "../../../hooks/WeeklyDateHook";
import { patientData } from "../../../mock/patient-data";
import {
  getHighestDiastolicBloodPressureByDate,
  getHighestSystolicBloodPressureByDate,
} from "../../../helpers/chart-helper";
import WeekController from "./WeekController";

const OPTIONS_CHART = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
  },
  // colors: ['#77B6EA', '#545454', "#26E7A6"],
  stroke: {
    width: [5, 7, 5],
    curve: "straight",
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [2],
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 15,
    offsetY: 0,
    shape: "square",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  legend: {
    position: "top",
    floating: true,
    offsetX: 20,
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
  },
};

const HeartAndRespirationRateChart = () => {
  const { weekDates, nextWeek, prevWeek, isInitialState, reset, monthScope } =
    useWeeklyDate();

  const highestDiastolicBloodPressureByDate =
    getHighestDiastolicBloodPressureByDate(patientData.dailyInformation);
  const highestSystolicBloodPressureByDate =
    getHighestSystolicBloodPressureByDate(patientData.dailyInformation);

  const highestDiastolicBloodPressureData = [];
  const highestSystolicBloodPressureData = [];

  for (let i = 0; i < weekDates.length; i++) {
    const day = weekDates[i];
    highestDiastolicBloodPressureData[i] =
      highestDiastolicBloodPressureByDate[day] || 0;
    highestSystolicBloodPressureData[i] =
      highestSystolicBloodPressureByDate[day] || 0;
  }

  const optionscolumnchart = {
    ...OPTIONS_CHART,
    xaxis: { categories: weekDates },
  };

  const seriescolumnchart = [
    {
      name: "Heart Rate",
      type: "column",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Respiration Rate",
      type: "column",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
    {
      name: "Body Temperature",
      type: "line",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ];

  return (
    <DashboardCard
      title="Heart and Respiration Rates"
      action={
        <WeekController
          showReset={!isInitialState}
          prevWeek={prevWeek}
          nextWeek={nextWeek}
          reset={reset}
          monthScope={monthScope}
        />
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="370px"
      />
    </DashboardCard>
  );
};

export default HeartAndRespirationRateChart;
