import moment from 'moment';

// Set Monday as the start of the week
moment.updateLocale('en', {
    week: {
        dow: 1 // Monday is the first day of the week
    }
});

const formatDay = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

const mapDatesToWeeklyLabel = (dates = []) => {
    const weeklyLabels = dates.map(date => {
        const formattedDate = moment(date).format('MM/DD - dddd');
        return formattedDate;
    });

    return weeklyLabels;
};

const getMonthScope = (weekDates) => {
    const firstDate = moment(weekDates[0]);
    const lastDate = moment(weekDates[weekDates.length - 1]);

    const firstMonth = firstDate.format('MMMM');
    const lastMonth = lastDate.format('MMMM');

    const year = firstDate.format('YYYY');

    if (firstMonth === lastMonth) {
        return `${firstMonth} ${year}`;
    } else {
        return `${firstMonth} - ${lastMonth} ${year}`;
    }
};

const getStartOfWeek = date => {
    const dayOfWeek = date.getDay() || 7;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - dayOfWeek);
};

const getEndOfWeek = date => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
    return endOfWeek;
};

const generateWeekDates = startDate => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        weekDates.push(formatDay(newDate));
    }
    return weekDates;
};

const subtractWeeks = (date, weeksToSubtract) => {
    return moment(date).subtract(weeksToSubtract, 'weeks');
}

export { formatDay, mapDatesToWeeklyLabel, getMonthScope, getStartOfWeek, getEndOfWeek, generateWeekDates, subtractWeeks }