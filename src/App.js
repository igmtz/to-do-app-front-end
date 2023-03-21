
import './App.css';
import { useEffect, useState } from 'react';
import { getAllToDos,  getToDoStats, sortToDos, filterToDosByName, filterToDosByFlag, filterToDosByPriority } from './service/ToDoService/ToDoService';
import SearchBox from './components/Search/SearchBox';
import StatisticsBox from './components/Statistics/StatisticsBox';
import ToDo from './components/ToDo/ToDo';

function App() {
  const [stats, setStats] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toDoItems, setToDoItems] = useState([]);

  useEffect(() => {

    getAllToDos().then((response) => {
        console.log(response);
        setToDoItems(response);
        console.log("getAll")
    });

}, [refreshKey]);

const getStatsHandler = () => {
  getToDoStats().then((response) => {
    setStats(response);
    console.log(stats);
    console.log("stats load");
  });
};

const sortElements = (toDoItems, priorityOrder, dateOrder) => {
  sortToDos(toDoItems, priorityOrder, dateOrder).then((response) => {
    setToDoItems(response);
    console.log("sorting");
    });
};

const filterByFlag = (data, flag) => {
  filterToDosByFlag(data, flag).then((response) => {
    console.log("flag filter");
    });
};

const filterByName = (data, name) => {
  filterToDosByName(data, name).then((response) => {
    console.log("Name filter");
    });
};

const filterByProtity = (data, priority) => {
  filterToDosByPriority(data, priority).then((response) => {
    console.log("Priority filter");
    });
};

const changeKey = () => {
  setRefreshKey(refreshKey + 1);
  console.log(refreshKey);
  console.log("realoaded");
}

  return (
    <div className="App">
      <div className="container">
        <SearchBox filterByProtity={filterByProtity} filterByFlag={filterByFlag} filterByName={filterByName}></SearchBox>
        <ToDo sortElements={sortElements} getStatsHandler={getStatsHandler}  toDoItems={toDoItems} changeKey={changeKey}></ToDo>
        <StatisticsBox stats={stats}></StatisticsBox>
      </div>
    </div>
  );
}

export default App;
