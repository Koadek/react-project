import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { initialDecks } from './data.js';

class UnconnectedSearchResults extends Component {
  render = () => {
    const results = initialDecks.filter(quiz => {
      return quiz.title.toLowerCase().includes(this.props.query.toLowerCase());
    });
    return (
      <div className="decks">
        {results.map(quiz => (
          <div className="quiz-card">
            <div className="quiz-title">{quiz.title}</div>
            <Link className="choices link" to={'/quiz/' + quiz.id}>
              Play
            </Link>
          </div>
        ))}
      </div>
    );
  };
}
const mapStateToProps = st => {
  return {
    query: st.searchQuery,
  };
};
const SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
