import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function Pagination({ pages, activePage }) {
  return (
    <div className={styles.pagination}>
      <Link
        to={{
          pathname: '/',
          search: `?page=${activePage > 1 ? activePage - 1 : activePage}`
        }}
        className={styles.pagination_btn}
      >
        Назад
      </Link>

      <div className={styles.pagination_digits}>
        {pages.map(item => (
          <Link
            to={{
              pathname: '/',
              search: `?page=${item}`
            }}
            key={item}
            className={styles.digit + (+activePage === item ? ` ${styles.active}` : '')}
          >
            {item}
          </Link>
        ))}
      </div>

      <Link
        to={{
          pathname: '/',
          search: `?page=${activePage < pages.length ? +activePage + 1 : activePage}`
        }}
        className={styles.pagination_btn}
      >
        Далее
      </Link>
    </div>
  )
}
