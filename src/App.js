import './App.css';
import SearchForm from './components/search/SearchForm';
import Table from './components/table/Table';
import Pagination from './components/pagination/Pagination';
import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
    </div>
  );
}

export default App;
