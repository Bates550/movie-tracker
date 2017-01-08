import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar/SearchBar';

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

  isMovieInList(movieData) {
    const foundMovie = this.state.movieList.find((movie) => {
      return movie.imdbID === movieData.imdbID;
    });
    return foundMovie !== undefined;
  }

  updateMovieList(movieData) {
    const isMovieInList = this.isMovieInList(movieData);
    const addToMovieList = (movieList, movieData) => {
      return movieList.concat(movieData);
    };
    const removeFromMovieList = (movieList, movieData) => {
      const result =  movieList.reduce((movies, movie) => {
        if (movie.imdbID === movieData.imdbID) {
          return movies;
        }
        return movies.concat(movie);
      }, []);
      return result;
    }

    const updatedMovieList = isMovieInList
      ? removeFromMovieList(this.state.movieList, movieData)
      : addToMovieList(this.state.movieList, movieData)
    ;
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
            const movie = this.findMovieInSearchResults(title);
            if (movie !== undefined) {
              this.updateMovieList(movie);
            }
          }}
          movieList={this.state.movieList}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
