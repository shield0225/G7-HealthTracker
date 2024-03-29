import { Avatar, Grid, Stack, Typography, useTheme } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { IconArrowDownRight, IconArrowUpLeft, IconStethoscope } from "@tabler/icons-react";
import Chart from "react-apexcharts";
import { getAverageDailyInformationByWeeks } from "../../../helpers/chart-helper";
import { patientData } from "../../../mock/patient-data";
import { calculatePercentageHigher } from "../../../helpers/number-helper";

const DiastolicBloodAverageWeeksChart = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = '#ecf2ff';
    const errorlight = '#fdede8';

    const averageResult = getAverageDailyInformationByWeeks(patientData.dailyInformation, 2, ['diastolicBloodPresure', 'systolicBloodPresure']);
    const [twoWeeksAgo, oneWeekAgo, currentWeek] = averageResult.map(({ diastolicBloodPresure }) => parseInt(diastolicBloodPresure));

    const percentageHigherLastWeek = calculatePercentageHigher(currentWeek, oneWeekAgo);

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'donut',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 155,
        },
        labels: ['Current Week', 'One Week Ago', 'Two Weeks Ago'],
        colors: [primary, primarylight, '#F9F9FD'],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent',
                },
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120,
                    },
                },
            },
        ],
    };

    const seriescolumnchart = [currentWeek, oneWeekAgo, twoWeeksAgo];

    const iconUpOrDown = () => {
        if (percentageHigherLastWeek > 0) {
            return <IconArrowUpLeft width={20} color="#FA896B" />;
        }

        if (percentageHigherLastWeek < 0) {
            return <IconArrowDownRight width={20} color="#FA896B" />
        }

        return ""
    }

    const showPercentage = () => {
        if (percentageHigherLastWeek > 0) {
            return `+${percentageHigherLastWeek}%`
        }

        if (percentageHigherLastWeek < 0) {
            return `-${percentageHigherLastWeek}%`
        }

        return "0%"
    }

    return (
        <DashboardCard title="Diastolic Average">
            <Grid container spacing={3}>
                {/* column */}
                <Grid item xs={7} sm={7}>
                    <Typography variant="h5" fontWeight="700">
                        <IconStethoscope width={20} />  {currentWeek}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                            {iconUpOrDown()}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="600">
                            {showPercentage()}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            last week
                        </Typography>
                    </Stack>
                    <Stack spacing={3} mt={5} direction="row">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                            ></Avatar>
                            <Typography variant="subtitle2" color="textSecondary">
                                Current
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
                            ></Avatar>
                            <Typography variant="subtitle2" color="textSecondary">
                                Previous
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                {/* column */}
                <Grid item xs={5} sm={5}>
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="donut"
                        height="150px"
                    />
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default DiastolicBloodAverageWeeksChart;