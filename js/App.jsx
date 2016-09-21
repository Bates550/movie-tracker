import React from 'react'
import ReactDOM from 'react-dom'

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

  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title (Year)</th>
            <th>Runtime</th>
            <th>{JSON.stringify(this.state.result)}</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map( (movie) => {
              return (
                <Row
                  imgUrl={movie.Poster}
                  title={movie.Title}
                  year={movie.Year}
                  runtime={movie.Runtime}
                  key={movie.imdbID}
                />
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
