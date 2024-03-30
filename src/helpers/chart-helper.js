import moment from 'moment';
import { formatDay, getStartOfWeek, subtractWeeks } from './date-helper';

const groupDailyInformation = (dailyInformation = [], propName, filterCallback) => {
    const groupedData = {};

    dailyInformation.forEach(item => {
        const createdAt = parseInt(item.createdAt);
        const day = formatDay(createdAt);
        const propValue = propName ? item[propName] : item;

        if (!groupedData[day] || !filterCallback || filterCallback(groupedData[day], propValue)) {
            groupedData[day] = propValue;
        }
    });

    return groupedData;
};

const getHighestDiastolicBloodPresureByDate = (dailyInformation = []) => groupDailyInformation(dailyInformation, "diastolicBloodPresure", (existingValue, newValue) => {
    return newValue > existingValue;
});

const getHighestSystolicBloodPresureByDate = (dailyInformation = []) => groupDailyInformation(dailyInformation, "systolicBloodPresure", (existingValue, newValue) => {
    return newValue > existingValue;
});

const filterGroupedDataByWeekDates = (groupedByDate = {}, weekDates = []) => {
    const filterResult = [];
    for (let i = 0; i < weekDates.length; i++) {
        const day = weekDates[i];
        filterResult[i] = groupedByDate[day] || 0;
    }
    return filterResult;
}

/**
 * get average of field starting current week going backwards
 */
const getAverageDailyInformationByWeeks = (dailyInformation = [], weeks = 1, properties = ['diastolicBloodPresure']) => {
    const startOfCurrentWeek = getStartOfWeek(new Date());
    let startingDate = subtractWeeks(startOfCurrentWeek, weeks);

    const groupedDailyInfo = groupDailyInformation(dailyInformation);
    const averageResult = [];
    const totalDays = (weeks + 1) * 7;
    let infoByWeek = [];
    for (let i = 1; i <= totalDays; i++) {
        const day = formatDay(startingDate);
        const item = groupedDailyInfo[day];
        if (item) {
            infoByWeek.push({ ...item, day });
        }

        if ((i % 7) === 0) {
            const averageData = {};
            for (const property of properties) {
                const sum = infoByWeek.reduce((acc, curr) => acc + curr[property], 0);
                const average = sum / 7;
                averageData[property] = average;
            }
            infoByWeek = [];
            averageResult.push(averageData);
        }
        startingDate = startingDate.add(1, 'day');
    }
    return averageResult;
}

export { groupDailyInformation, getHighestDiastolicBloodPresureByDate, getHighestSystolicBloodPresureByDate, getAverageDailyInformationByWeeks, filterGroupedDataByWeekDates }