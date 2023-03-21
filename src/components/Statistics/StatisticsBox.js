import './StatisticsBox.css';
import './AverageTime/AverageTime';
import AverageTime from './AverageTime/AverageTime';
import AverageTimeByPriority from './AverageTimeByPriority/AverageTimeByPriority';

function StatisticsBox(props) {

    
    return(
        <div className='statistics-box'>
            <div className='statistics-container'>
                <AverageTime averageAll={props.stats[0]}></AverageTime>
                <AverageTimeByPriority averageByPriority={props.stats}></AverageTimeByPriority>
            </div>
        </div>
    )
}

export default StatisticsBox;