import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar/SearchBar.jsx';
import Suggestions from './Suggestions';

import { search } from './endpoints/search';
import movies from './exampleData'
import MovieList from './MovieList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: [],
      searchResults: [],
    };
  }

  addMovie = (movieData) => {
    const movieNotInList = !this.isMovieInList(movieData);
    if (movieNotInList) {
      this.updateMovieList(movieData);
    } else {
      // Set some info/error state to show error to user
      console.log(`${movieData.Title} already exists in list`);
    }
  }

  isMovieInList(movieData) {
    const foundMovie = this.state.movieList.find((movie) => {
      return movie.imdbID === movieData.imdbID;
    });
    return foundMovie !== undefined;
  }

  updateMovieList(movieData) {
    const updatedMovieList = this.state.movieList.concat(movieData);
    this.setState({ movieList: updatedMovieList });
  }

  getTitlesFromResponse(response) {
    const searchResults = response.data.Search;

    return searchResults
      .filter((searchResult) => {
        return searchResult.Type === 'movie';
      })
      .map((movie) => {
        return movie.Title;
      });
  }

  findMovieInSearchResults(title) {
    return this.state.searchResults.find((searchResult) => {
      return searchResult.Title === title;
    });
  }

  removeMovie = (movieToRemove) => {
    return () => {
      const movieList = this.state.movieList.filter((movie) => {
        return movie.imdbID !== movieToRemove.imdbID;
      });
      this.setState({ movieList });
    }
  }

  render () {
    console.log(this.state.movieList);
    return (
      <div>
        <MovieList
          list={this.state.movieList}
          onRemove={this.removeMovie}
        />
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
          Suggestions={Suggestions}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
