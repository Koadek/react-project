import { connect } from 'react-redux';
import React, { Component } from 'react';
import QuestionChoice from './QuestionChoice';

class UnconnectedQuestionCard extends Component {
  handleNewQuestion = evt => {
    this.props.dispatch({
      type: 'setQuestion',
      question: evt.target.value,
      idx: this.props.questionId,
    });
  };

  addChoice = () => {
    this.props.dispatch({ type: 'addChoice', idx: this.props.questionId });
  };

  render() {
    return (
      <div className="form new-question">
        <div className="answers-qa">
          <label>Question {this.props.questionId}</label>
          <input
            type="text"
            onChange={this.handleNewQuestion}
            value={this.props.myCards.cards[this.props.questionId].question}
          />
        </div>
        <div>
          {this.props.myCards.cards[this.props.questionId].choices.map(
            (choice, idx) => (
              <QuestionChoice
                choice={choice}
                choiceId={idx}
                questionId={this.props.questionId}
              />
            )
          )}
        </div>
        <div className="add-choice">
          <button onClick={this.addChoice}>add choice</button>
        </div>
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    myCards: st.newDeck,
  };
};

const QuestionCard = connect(mapStateToProps)(UnconnectedQuestionCard);
export default QuestionCard;
