import { connect } from 'react-redux';
import React, { Component } from 'react';
import { MyQuestion, ChoiceLengthBtn, CustomChoices } from './components';

class UnconnectedQuestionChoice extends Component {
  handleNewAnswer = () => {
    this.props.dispatch({
      type: 'setAnswer',
      choiceId: this.props.choiceId,
      questionId: this.props.questionId,
    });
  };

  handleNewChoice = evt => {
    this.props.dispatch({
      type: 'setChoice',
      text: evt.target.value,
      choiceId: this.props.choiceId,
      questionId: this.props.questionId,
    });
  };

  removeChoice = () => {
    this.props.dispatch({
      type: 'removeChoice',
      questionId: this.props.questionId,
      choiceId: this.props.choiceId,
    });
  };

  render() {
    return (
      <MyQuestion>
        <CustomChoices>
          <label>Choice {this.props.choiceId}</label>
          <label>
            Mark as answer:
            <input
              type="checkbox"
              checked={
                this.props.myCards.cards[this.props.questionId].answer ===
                this.props.myCards.cards[this.props.questionId].choices[
                  this.props.choiceId
                ]
              }
              onChange={this.handleNewAnswer}
            />
          </label>
        </CustomChoices>
        <input
          type="text"
          onChange={this.handleNewChoice}
          value={this.props.choice}
        />
        {this.props.choiceId > 1 && (
          <ChoiceLengthBtn>
            <button type="button" onClick={this.removeChoice}>
              remove choice
            </button>
          </ChoiceLengthBtn>
        )}
      </MyQuestion>
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
