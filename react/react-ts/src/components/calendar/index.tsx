import './index.scss'
import MonthCalendar from './MonthCalendar'
import { Dayjs } from 'dayjs';
import Header from './Header';
import { useState } from 'react';
import dayjs from 'dayjs';

export interface CalendarProps {
    value: Dayjs;
    onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(props.value);

    // 切换到上个月
    const handlePrevMonth = () => {
        const newDate = currentDate.subtract(1, 'month');
        setCurrentDate(newDate);
        props.onChange?.(newDate);
    };

    // 切换到下个月
    const handleNextMonth = () => {
        const newDate = currentDate.add(1, 'month');
        setCurrentDate(newDate);
        props.onChange?.(newDate);
    };

    // 回到今天
    const handleToday = () => {
        const today = dayjs();
        setCurrentDate(today);
        props.onChange?.(today);
    };

    return (
        <div className="calendar">
            <Header 
                value={currentDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
            />
            <MonthCalendar value={currentDate}/>
        </div>
    )
}
export default Calendar