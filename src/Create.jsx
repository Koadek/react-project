import { connect } from 'react-redux';
import React, { Component } from 'react';
import QuestionCard from './QuestionCard.jsx';
import { Link } from 'react-router-dom';

class UnconnectedCreate extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch({ type: 'submit' });
  };

  handleNewTitle = evt => {
    this.props.dispatch({ type: 'newTitle', title: evt.target.value });
  };

  addCard = () => {
    this.props.dispatch({ type: 'addCard' });
  };

  render() {
    return (
      <div className="decks quiz">
        <div className="quiz-card question-card">
          <div className="quiz-title">Create a deck</div>
          <form onSubmit={this.handleSubmit} className="answers">
            <div className="form answers-qa">
              <label>Title</label>
              <input
                onChange={this.handleNewTitle}
                value={this.props.newTitle}
              />
            </div>
            {this.props.myCards.cards.map((question, idx) => (
              <QuestionCard questionId={idx} />
            ))}
            <button className="add-card" onClick={this.addCard}>
              Add card
            </button>
            <Link className="choices" to="/">
              {' '}
              <input className="choices" type="submit" value="Submit" />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    newTitle: st.newDeck.title,
    myCards: st.newDeck,
  };
};

const Create = connect(mapStateToProps)(UnconnectedCreate);
export default Create;
