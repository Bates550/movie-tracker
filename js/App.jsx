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

    return searchResults.map((movie) => {
      return movie.Title;
    });
  }

  findMovieInSearchResults(title) {
    return this.state.searchResults.find((searchResult) => {
      return searchResult.Title === title;
    });
  }

  render () {
    return (
      <div>
        <ul>
          {this.state.movieList.map((movie) => {
            return (
              <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
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
              this.addToMovieList(data)
            }
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
