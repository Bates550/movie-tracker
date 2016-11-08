import React, { PropTypes } from 'react';
import MovieListItem from './MovieListItem';

const MovieList = ({ list, onRemove }) => {
  return (
    <ul>
      {list.map((movie) =>
        <MovieListItem
          key={movie.imdbID}
          movie={movie}
          onRemove={onRemove}
        />
      )}
    </ul>
  );
};

MovieList.propTypes = {
};

export default MovieList;
