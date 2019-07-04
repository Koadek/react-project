import { connect } from 'react-redux';
import React, { Component } from 'react';
import QuestionChoice from './QuestionChoice';
import {
  QuestionCardStyle,
  DeleteBtnBox,
  DeleteBtn,
  MyQuestion,
  ChoiceLengthBtn,
} from './components';

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

  removeCard = () => {
    this.props.dispatch({ type: 'removeCard', idx: this.props.questionId });
  };

  render() {
    return (
      <QuestionCardStyle>
        {this.props.questionId > 0 && (
          <DeleteBtnBox>
            <DeleteBtn onClick={this.removeCard}>X</DeleteBtn>
          </DeleteBtnBox>
        )}
        <MyQuestion>
          <label>Question {this.props.questionId}</label>
          <input
            type="text"
            onChange={this.handleNewQuestion}
            value={this.props.myCards.cards[this.props.questionId].question}
          />
        </MyQuestion>
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
        <ChoiceLengthBtn>
          <button type="button" onClick={this.addChoice}>
            add choice
          </button>
        </ChoiceLengthBtn>
      </QuestionCardStyle>
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
