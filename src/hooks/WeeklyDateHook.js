import { useState } from 'react';
import { generateWeekDates, getMonthScope, getStartOfWeek } from '../helpers/date-helper';

const useWeeklyDate = () => {
    const initialStartDate = getStartOfWeek(new Date());
    const [startDate, setStartDate] = useState(initialStartDate);
    const isInitialState = initialStartDate?.toDateString() === startDate?.toDateString();

    const nextWeek = () => {
        const nextStartDate = new Date(startDate);
        nextStartDate.setDate(nextStartDate.getDate() + 7);
        setStartDate(nextStartDate);
    };

    const prevWeek = () => {
        const prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        setStartDate(prevStartDate);
    };

    const reset = () => {
        setStartDate(initialStartDate);
    };

    const weekDates = generateWeekDates(startDate);
    const monthScope = getMonthScope(weekDates);

    return { weekDates, nextWeek, prevWeek, isInitialState, reset, monthScope };
};

export default useWeeklyDate;
