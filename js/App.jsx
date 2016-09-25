import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from 'react-search-bar';

import { search } from './endpoints/search';
import movies from './exampleData'
import { Row } from './Row'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result: {},
    };
  }

  componentDidMount() {
    const result = search('Bourne');
    result.then((response) => {
      this.setState({ result: response.data });
    })
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
      <SearchBar 
        onChange={(input, resolve) => {
          if (input.length > 1) {
            search(input).then((response) => {
              const titles = this.getTitlesFromResponse(response);
              console.log(titles);
              resolve(titles);
            })
          }
        }}
      />
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
