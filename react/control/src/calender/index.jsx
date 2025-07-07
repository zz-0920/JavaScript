import './index.css'
import { useState } from 'react'

function Calendar(props) {
    const { defaultValue, onChange } = props

    const [date, setDate] = useState(defaultValue)

    const handleLastMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }
    const daysOfMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }
    const firstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay()
    }
    const renderDates = () => {
        const days = []

        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>)
        }
        for (let i = 1; i <= daysCount; i++) {
            const clickHandler = () => {
                const curDate = new Date(date.getFullYear(), date.getMonth(), i)
                setDate(curDate)
                onChange(curDate)
            }
            if (i === date.getDate()) {
                days.push(<div key={`day-${i}`} className="day today" onClick={clickHandler}>{i}</div>)
            } else {
                days.push(<div key={`day-${i}`} className="day" onClick={clickHandler}>{i}</div>)
            }
        }
        return days
    }

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handleLastMonth}>&lt;</button>
                <div>{date.getFullYear()} 年 {date.getMonth() + 1} 月</div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">日</div>
                <div className="day">一</div>
                <div className="day">二</div>
                <div className="day">三</div>
                <div className="day">四</div>
                <div className="day">五</div>
                <div className="day">六</div>
                {renderDates()}
                {/* <div className="empty"></div>
                <div className="empty"></div>
                <div className="day">1</div>
                <div className="day">2</div>
                <div className="day">3</div>
                <div className="day">4</div>
                <div className="day">5</div>
                <div className="day">6</div>
                <div className="day">7</div>
                <div className="day">8</div>
                <div className="day">9</div>
                <div className="day">10</div>
                <div className="day">11</div>
                <div className="day">12</div>
                <div className="day">13</div>
                <div className="day">14</div>
                <div className="day">15</div>
                <div className="day">16</div>
                <div className="day">17</div>
                <div className="day">18</div>
                <div className="day">19</div>
                <div className="day">20</div>
                <div className="day">21</div>
                <div className="day">22</div>
                <div className="day">23</div>
                <div className="day">24</div>
                <div className="day">25</div>
                <div className="day">26</div>
                <div className="day">27</div>
                <div className="day">28</div>
                <div className="day">29</div>
                <div className="day">30</div> */}
            </div>
        </div>
    )

}

export default Calendar