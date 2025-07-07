import Calendar from './calender/index.jsx'

function App4() {
    return (
            <Calendar defaultValue={new Date()} 
            onChange={(newDate) => {
                alert(newDate.toLocaleDateString())
            }}
            />
    )
}

export default App4
