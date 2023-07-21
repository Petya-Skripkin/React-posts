export const getAPI = (activePage, limit = 10) => {
  return `https://jsonplaceholder.typicode.com/posts?_page=${activePage}&_limit=${limit}`
}
