import React, { PropTypes } from 'react';

const MovieListItem = ({ movie, onRemove }) => {
  return (
    <li>
      {movie.Title}
      ({movie.Year})
      <button
        onClick={onRemove(movie)}
      >Remove</button>
    </li>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func.isRequired,
};

export default MovieListItem;
