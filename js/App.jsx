import React from 'react'
import ReactDOM from 'react-dom'

import movies from './exampleData'
import { Row } from './Row'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title (Year)</th>
            <th>Runtime</th>
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
