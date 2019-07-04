import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Deck, Quiz, CardTitle } from './components';

class UnconnectedSearchResults extends Component {
  render = () => {
    const results = this.props.decks.filter(quiz => {
      return quiz.title.toLowerCase().includes(this.props.query.toLowerCase());
    });
    return (
      <Deck>
        {results.map(quiz => (
          <Quiz>
            <CardTitle>{quiz.title}</CardTitle>
            <Link className="choices link" to={'/quiz/' + quiz.id}>
              Play
            </Link>
          </Quiz>
        ))}
      </Deck>
    );
  };
}
const mapStateToProps = st => {
  return {
    query: st.searchQuery,
    decks: st.decks,
  };
};
const SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
