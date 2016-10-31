import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar/SearchBar.jsx';

import { search } from './endpoints/search';
import movies from './exampleData'
import { Row } from './Row'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addMovie = this.addMovie.bind(this);
    this.state = {
      movieList: [],
      searchResults: [],
    };
  }

  addMovie(movieData) {
    const movieNotInList = !this.isMovieInList(movieData);
    if (movieNotInList) {
      this.addToMovieList(movieData);
    }
  }

  isMovieInList(movieData) {
    const foundMovie = this.state.movieList.find((movie) => {
      return movie.imdbID === movieData.imdbID;
    });
    return foundMovie !== undefined;
  }

  addToMovieList(movieData) {
    const updatedMovieList = this.state.movieList.concat(movieData);
    this.setState({ movieList: updatedMovieList });
  }

  getTitlesFromResponse(response) {
    const searchResults = response.data.Search;

    return searchResults.map((movie) => {
      return movie.Title;
    });
  }

  findMovieInSearchResults(title) {
    return this.state.searchResults.find((searchResult) => {
      return searchResult.Title === title;
    });
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
                const responseIsValid = !response.data.Error;
                if (responseIsValid) {
                  this.setState({ searchResults: response.data.Search });
                  const titles = this.getTitlesFromResponse(response);
                  resolve(titles);
                }
              });
            }
          }}
          onSearch={(title) => {
            const data = this.findMovieInSearchResults(title);
            if (data !== undefined) {
              this.addMovie(data)
            }
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
