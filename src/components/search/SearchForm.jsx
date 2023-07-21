import { ReactComponent as Logo } from '../../asset/logo.svg';
import styles from './styles.module.css';

export default function SearchForm({ value, onChange }) {
  return (
    <label className={styles.search}>
      <input
        value={value}
        onChange={onChange}
        className={styles.search_input}
        placeholder={'Поиск'}
      />
      <button className={styles.search_btn}>
        <Logo />
      </button>
    </label>
  )
}
