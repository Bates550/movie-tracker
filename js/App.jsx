import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar/SearchBar.jsx';

import { search } from './endpoints/search';
import movies from './exampleData'
import { Row } from './Row'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      id: []
    };
  }

  getTitlesFromResponse(response) {
    const searchResults = response.data.Search;
    const responseExists =
      response.data.Response === "True" ? true : false;
    if (Array.isArray(searchResults) && responseExists) {
      return searchResults.map((movie) => {
        return movie.Title;
      });
    }
    return [];
  }

  removeMovie(movieToRemove) {
    const movieList = this.state.movieList.filter((movie) => {
      return movie.imdbID !== movieToRemove.imdbID;
    });
    this.setState({ movieList });
  }

  render () {
    return (
      <div>
        <ul>
          {this.state.movieList.map((movie) => {
            return (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
                <button
                  onClick={() => {
                    this.removeMovie(movie);
                  }}
                >
                  Remove
                </button>
              </li>
            )
          })}
        </ul>
        <SearchBar
          onChange={(input, resolve) => {
            if (input.length > 1) {
              search(input).then((response) => {
                const titles = this.getTitlesFromResponse(response);
                resolve(titles);
              })
            }
          }}
          onSearch={(searchTerm) => {
            const movieList = this.state.movieList.concat(searchTerm);
            this.setState({ movieList });
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
