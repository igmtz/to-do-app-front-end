
import './App.css';
import { useEffect, useState } from 'react';
import {getAllToDos, getToDoStats, getToDosFilteredAndSortedWithPagination } from './service/ToDoService/ToDoService';
import SearchBox from './components/Search/SearchBox';
import StatisticsBox from './components/Statistics/StatisticsBox';
import ToDo from './components/ToDo/ToDo';

function App() {
  const [stats, setStats] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toDoItems, setToDoItems] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);
  
  const [currentPage, setCurrentPage] = useState(1)

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("default");
  const [flag, setFlag] = useState("");
  const [priorityOrder, setPriorityOrder] = useState("default");
  const [dateOrder, setDateOrder] = useState("default");

  useEffect(() => {
    getToDosFilteredAndSortedWithPagination(name, priority, flag, priorityOrder, dateOrder, currentPage).then((response) => {
        setToDoItems(response);
    });
    getAllToDos().then((response) => {
      setTotalItems(response.length);
      setNumberOfPages(Math.ceil(totalItems / 10));
      if (numberOfPages === 0) {
          setNumberOfPages(1);
      };
  });

}, [refreshKey]);

const getStatsHandler = () => {
  getToDoStats().then((response) => {
    setStats(response);
  });
};

const changeKey = () => {
  setRefreshKey(refreshKey + 1);
}

const changeSortingParameters = (newPriorityOrder, newDateOrder) => {
  setPriorityOrder(newPriorityOrder);
  setDateOrder(newDateOrder);
  changeKey();
}

const changeFilteringParameter = (newName, newPriority, newFlag) => {
  setName(newName);
  setPriority(newPriority);
  setFlag(newFlag);
  changeKey();
}

const changePageHandler = (newCurrentPage) => {
  setCurrentPage(newCurrentPage);
  changeKey();
}

  return (
    <div className="App">
      <div className="container">
        <SearchBox changeFilteringParameter={changeFilteringParameter}></SearchBox>
        <ToDo currentPage={currentPage} totalItems={totalItems} numberOfPages={numberOfPages} changePageHandler={changePageHandler} getStatsHandler={getStatsHandler}  toDoItems={toDoItems} changeKey={changeKey} changeSortingParameters={changeSortingParameters}></ToDo>
        <StatisticsBox stats={stats}></StatisticsBox>
      </div>
    </div>
  );
}

export default App;
