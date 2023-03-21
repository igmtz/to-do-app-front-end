import './AverageTimeByPriority.css'

function AverageTimeByPriority(props) {
    return (
        <div className="average-time-priority-box">
            <div className="average-time-priority-container">
                <div className="title-container">
                    <p className="title">Average time to complete a task by Priority</p>
                </div>
                <div className='time-cards'>
                    <div className='low'>
                        <div className='time-container-priority'>
                            <p className='time-priority'>{props.averageByPriority[3]} min</p>
                        </div>
                        <div className='priority-container'>
                            <p className='priority'>Low</p>
                        </div>
                    </div>
                    <div className='medium'>
                        <div className='time-container-priority'>
                            <p className='time-priority'>{props.averageByPriority[2]} min</p>
                        </div>
                        <div className='priority-container'>
                            <p className='priority'>Medium</p>
                        </div>
                    </div>
                    <div className='high'>
                        <div className='time-container-priority'>
                            <p className='time-priority'>{props.averageByPriority[1]} min</p>
                        </div>
                        <div className='priority-container'>
                            <p className='priority'>High</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AverageTimeByPriority;