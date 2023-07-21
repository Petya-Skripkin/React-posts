import { ReactComponent as Logo } from './asset/logo.svg';
import { ReactComponent as Arrow } from './asset/arrow.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getAPI = (activePage, limit = 10) => {
  return `https://jsonplaceholder.typicode.com/posts?_page=${activePage}&_limit=${limit}`
}

function App() {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState();
  const [pages, setPages] = useState([1]);
  const [activePage, setActivePage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState(true);

  useEffect(() => {
    const searchText = searchString ? '&q=' + searchString.replace(/\s+/g, ' ').trim() : '';
    axios.get(`${getAPI(activePage)}&_sort=${sort}&_order=${order ? 'asc' : 'desc'}${searchText}`)
      .then(res => {
        setLoad(false)
        setData(res.data)
        const totalPosts = (+res.headers['x-total-count'] / 10) + 1;
        const numbers = [];
        for (let i = 1; i < totalPosts; i++) {
          numbers.push(i)
        }
        setPages(numbers)
      })
      .catch(err => {
        console.log(err);
      })
  }, [activePage, searchString, sort, order]);

  function searchEvent(event) {
    setSearchString(event);
  }

  function nextPage() {
    if (activePage < pages.length) {
      setActivePage(activePage + 1);
    }
  }

  function prevPage() {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  }

  function sorting(param) {
    if (param === sort) {
      setOrder(!order);
    }

    setSort(param)
  }

  return (
    <div className="App">
      {load ? 'loading...' : (
        <>
          <label className={'search'}>
            <input value={searchString} onChange={(e) => searchEvent(e.target.value)} className={'search-input'} placeholder={'Поиск'} />
            <button className={'search-btn'}>
              <Logo />
            </button>
          </label>
          <div className={'table'}>
            <div className={'table-head'}>
              <div onClick={() => sorting('id')} className={`table-item table-item-id`}>
                ID
                <Arrow />
              </div>
              <div onClick={() => sorting('title')} className={`table-item `}>
                Заголовок
                <Arrow />
              </div>
              <div onClick={() => sorting('body')} className={`table-item `}>
                Описание
                <Arrow />
              </div>
            </div>
            {data && data.map(item => (
              <div className={'table-row'} key={item.id}>
                <div className={`table-item table-item-id`}>
                  {item.id}
                </div>
                <div className={`table-item `}>
                  {item.title}
                </div>
                <div className={`table-item `}>
                  {item.body}
                </div>
              </div>
            ))}
          </div>
          <div className={'pagination'}>
            <button onClick={prevPage} className={'pagination-btn prev'}>Назад</button>
            <div className={'pagination-digits'}>
              {pages.map(item => (
                <span onClick={() => setActivePage(item)} key={item} className={'digit' + (activePage === item ? ' active' : '')}>
                  {item}
                </span>
              ))}
            </div>
            <button onClick={nextPage} className={'pagination-btn next'}>Далее</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
