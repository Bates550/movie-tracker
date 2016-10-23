import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar/SearchBar.jsx';

import { search } from './endpoints/search';
import movies from './exampleData'
import { Row } from './Row'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addToMovieList = this.addToMovieList.bind(this);
    this.state = {
      movieList: [],
      searchResults: [],
    };
  }
  addToMovieList(movieData) {
    const movieList = this.state.movieList.concat(movieData);
    this.setState({ movieList });
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

  render () {
    return (
      <div>
        <ul>
          {this.state.movieList.map((movie) => {
            console.log(movie);
            return (
              <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
            )
          })}
        </ul>
        <SearchBar
          onChange={(input, resolve) => {
            if (input.length > 1) {
              search(input).then((response) => {
                //check if response is valid
                if (!response.data.Error) {
                  this.setState({ searchResults: response.data.Search });
                }
                const titles = this.getTitlesFromResponse(response);
                resolve(titles);
              })
            }
          }}
          onSearch={(movieTitle) => {
            console.log(this.state)
            const movieData = this.state.searchResults.find((searchResult) => {
              return searchResult.Title === movieTitle;
            });
            if (movieData) {
              this.addToMovieList(movieData)
            }
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
