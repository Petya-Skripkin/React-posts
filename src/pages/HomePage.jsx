import { useEffect, useMemo, useState } from 'react';
import { getAPI } from '../scripts/getApi';
import { getData } from '../scripts/getData';
import SearchForm from '../components/search/SearchForm';
import Table from '../components/table/Table';
import Pagination from '../components/pagination/Pagination';
import { useQuery } from '../hooks/useQuery';

export default function HomePage() {
  const query = useQuery();
  const page = query.get('page');
  const [load, setLoad] = useState(true);
  const [data, setData] = useState();
  const [pages, setPages] = useState([1]);
  const [searchString, setSearchString] = useState();
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState(true);

  useEffect(() => {
    const searchText = searchString ? '&q=' + searchString.replace(/\s+/g, ' ').trim() : '';
    const queryUrl = `${getAPI(page)}&_sort=${sort}&_order=${order ? 'asc' : 'desc'}${searchText}`;
    const collectDataInfo = {
      url: queryUrl,
      setLoad,
      setData,
      setPages
    }

    getData(collectDataInfo)
  }, [page, searchString, sort, order]);

  function sorting(param) {
    if (param === sort) {
      setOrder(!order);
    }

    setSort(param)
  }

  return (
    <>
      {
        load ? 'loading...' : (
          <>
            <SearchForm
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Table
              data={data}
              sorting={sorting}
            />
            <Pagination
              pages={pages}
              activePage={page}
            />
          </>
        )
      }
    </>
  )
}
