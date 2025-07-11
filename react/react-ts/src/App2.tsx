import Calendar from "./components/calendar"
import dayjs from 'dayjs'
import { useState } from 'react'

function App() {
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

    const handleDateChange = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        console.log('选中的日期:', date.format('YYYY-MM-DD'));
    };

    return (
        <div>
            <Calendar 
                value={selectedDate}
                onChange={handleDateChange}
            />
        </div>
    )
}
export default App
