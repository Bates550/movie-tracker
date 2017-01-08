import React, { PropTypes } from 'react';
import classNames from 'classnames';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    };
  }
  onTouchStart(index) {
    this.timer = setTimeout(() => {
      this.setState({activeItem: index});
    }, 200);
  }
  onTouchMove() {
    clearTimeout(this.timer);
    this.touchedMoved = true;
    this.setState({activeItem: -1});
  }
  onTouchEnd(suggestion) {
    if (!this.touchedMoved) {
      setTimeout(() => {
        this.props.onAdd(suggestion);
      }, 220);
    }
    this.touchedMoved = false;
  }
  render() {
    const {highlightedItem, movieList, searchTerm, suggestions} = this.props;
    const {activeItem} = this.state;
    const titleList = movieList.map(movie => movie.Title);
    return (
      <ul
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState({activeItem: -1})}>
        {suggestions.map((suggestion, index) => {
          const lowerSearchTerm = searchTerm.toLowerCase()
          const lowerSuggestion = suggestion.toLowerCase();
          const searchTermStartIndex = lowerSuggestion.indexOf(lowerSearchTerm);
          const searchTermEndIndex = searchTermStartIndex + lowerSearchTerm.length;
          const leftSuggestionFragment = suggestion.substring(0, searchTermStartIndex);
          const rightSuggestionFragment = suggestion.substring(searchTermEndIndex);
          const actionButton = titleList.includes(suggestion)
           ?
            <button
              onClick={() => this.props.onRemove(suggestion)}
            >Remove</button>
           :
            <button
              onClick={() => this.props.onAdd(suggestion)}
            >Add</button>
          ;
          return (
            <li
              className={classNames({
                highlighted: highlightedItem === index || activeItem === index
              })}
              key={index}
              onMouseEnter={() => this.setState({activeItem: index})}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={() => this.onTouchStart(index)}
              onTouchMove={() => this.onTouchMove()}
              onTouchEnd={() => this.onTouchEnd(suggestion)}>
              <span>
                {leftSuggestionFragment !== '' &&
                  <span>{leftSuggestionFragment}</span>
                }
                <strong>{searchTerm}</strong>
                {rightSuggestionFragment !== '' &&
                  <span>{rightSuggestionFragment}</span>
                }
              </span>
              {actionButton}
            </li>
          );
        })}
      </ul>
    );
  }
}

Suggestions.propTypes = {
  highlightedItem: PropTypes.number,
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  movieList: PropTypes.array.isRequired,
};

export default Suggestions;
