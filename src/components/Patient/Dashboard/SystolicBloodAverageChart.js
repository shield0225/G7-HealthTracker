import { Avatar, Fab, Stack, Typography, useTheme } from "@mui/material";
import { IconArrowDownRight, IconArrowUpLeft, IconDropletPlus, IconStethoscope } from "@tabler/icons-react";
import DashboardCard from "./DashboardCard";
import Chart from "react-apexcharts";
import { filterGroupedDataByWeekDates, getHighestSystolicBloodPresureByDate } from "../../../helpers/chart-helper";
import { patientData } from "../../../mock/patient-data";
import { generateWeekDates, getStartOfWeek, subtractWeeks } from "../../../helpers/date-helper";
import { calculatePercentageHigher } from "../../../helpers/number-helper";

const SystolicBloodAverageChart = () => {
    // chart color
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondarylight = '#f5fcff';
    const errorlight = '#fdede8';


    const highestSystolicBloodPresureByDate = getHighestSystolicBloodPresureByDate(patientData.dailyInformation);
    const startOfCurrentWeek = getStartOfWeek(new Date());
    const startOfLastWeek = subtractWeeks(startOfCurrentWeek, 1);
    const currentWeekDates = generateWeekDates(startOfCurrentWeek);
    const lastWeekDates = generateWeekDates(new Date(startOfLastWeek));

    const highestSystolicBloodPresureDataCurrentWeek = filterGroupedDataByWeekDates(highestSystolicBloodPresureByDate, currentWeekDates);
    const highestSystolicBloodPresureDataLastWeek = filterGroupedDataByWeekDates(highestSystolicBloodPresureByDate, lastWeekDates);


    const currentWeekAverage = highestSystolicBloodPresureDataCurrentWeek.reduce((acc, item) => acc + item, 0) / 7;
    const lastWeekAverage = highestSystolicBloodPresureDataLastWeek.reduce((acc, item) => acc + item, 0) / 7;
    const percentageHigherLastWeek = calculatePercentageHigher(currentWeekAverage, lastWeekAverage);

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    };
    const seriescolumnchart = [
        {
            name: 'Current Week',
            color: secondary,
            data: highestSystolicBloodPresureDataCurrentWeek,
        },
        {
            name: 'Last Week',
            color: '#FDBB3A',
            data: highestSystolicBloodPresureDataLastWeek,
        },
    ];

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
        <DashboardCard
            title="Systolic Average"
            action={
                <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
                    <IconDropletPlus width={24} />
                </Fab>
            }
            footer={
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
            }
        >
            <>
                <Typography variant="h5" fontWeight="700" mt="-20px">
                    <IconStethoscope width={20} />  {parseInt(currentWeekAverage)}
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
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
            </>
        </DashboardCard>
    );
};

export default SystolicBloodAverageChart;