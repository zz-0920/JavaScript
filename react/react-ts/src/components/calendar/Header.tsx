import { Dayjs } from 'dayjs';

interface HeaderProps {
  value: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function Header({ value, onPrevMonth, onNextMonth, onToday }: HeaderProps) {
  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={onPrevMonth}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {value.format('YYYY年MM月')}
        </div>
        <div className="calendar-header-icon" onClick={onNextMonth}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={onToday}>
          今天
        </button>
      </div>
    </div>
  )
}

export default Header