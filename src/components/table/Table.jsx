import { ReactComponent as Arrow } from '../../asset/arrow.svg';
import styles from './styles.module.css';

// Конечно можно разделить еще на компоненты table-head & table-body
export default function Table({ data, sorting }) {
  return (
    <div className={styles.table}>
      <div className={styles.table_head}>
        <div onClick={() => sorting('id')} className={`${styles.table_item} ${styles.table_item_id}`}>
          ID
          <Arrow />
        </div>
        <div onClick={() => sorting('title')} className={`${styles.table_item} `}>
          Заголовок
          <Arrow />
        </div>
        <div onClick={() => sorting('body')} className={`${styles.table_item} `}>
          Описание
          <Arrow />
        </div>
      </div>

      {data && data.map(item => (
        <div className={styles.table_row} key={item.id}>
          <div className={`${styles.table_item} ${styles.table_item_id}`}>
            {item.id}
          </div>
          <div className={`${styles.table_item} `}>
            {item.title}
          </div>
          <div className={`${styles.table_item} `}>
            {item.body}
          </div>
        </div>
      ))}
    </div>
  )
}
