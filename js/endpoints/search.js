import axios from 'axios';

export function search(movieTitle) {
  return axios.get('http://www.omdbapi.com/', {
    params: {
      s: movieTitle,
    },
  })
}
