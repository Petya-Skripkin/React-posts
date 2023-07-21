import axios from 'axios';

export function getData({url, setLoad, setData, setPages}) {
  axios.get(url)
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
      console.error(err);
    })
}
