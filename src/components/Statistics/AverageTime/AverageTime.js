
import './AverageTime.css'

function AverageTime(props) {
    return (
        <div className="average-time-box">
            <div className="average-time-container">
                <div className="title-container">
                    <p className="title">Average time to complete a task</p>
                </div>
                <div className='time-container'>
                    <p className='time'>{props.averageAll} min</p>
                </div>
                
            </div>
        </div>
    )
}

export default AverageTime;