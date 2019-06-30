import { connect } from 'react-redux';
import React, { Component } from 'react';

class UnconnectedQuestionChoice extends Component {
  handleNewAnswer = () => {
    this.props.dispatch({
      type: 'setAnswer',
      choiceId: this.props.choiceId,
      questionId: this.props.questionId,
    });
  };

  handleNewChoice = evt => {
    this.props.dispatch[
      {
        type: 'setChoice',
        text: evt.target.value,
        choiceId: this.props.choiceId,
        questionId: this.props.questionId,
      }
    ];
  };

  render() {
    return (
      <div className="answers-qa">
        <div className="custom-answers">
          <label>Choice {this.props.choiceId}</label>
          <label>
            Mark as answer:
            <input
              type="checkbox"
              checked={this.props.myCards.cards[this.props.questionId].answer}
              onChange={this.handleNewAnswer}
            />
          </label>
        </div>
        <input
          type="text"
          onChange={this.handleNewChoice}
          value={this.props.choice}
        />
      </div>
    );
  }
}

let mapStateToProps = st => {
  return {
    myCards: st.newDeck,
  };
};

const QuestionChoice = connect(mapStateToProps)(UnconnectedQuestionChoice);
export default QuestionChoice;
