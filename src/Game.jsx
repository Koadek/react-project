import { connect } from 'react-redux';
import React, { Component } from 'react';

class UnconnectedGame extends Component {
  handleAnswer = answer => {
    this.props.dispatch({ type: 'questionAnswered', answer: answer });
  };
  render() {
    this.props.dispatch({ type: 'gameStart' });
    const card = this.props.game.cards;

    if (this.props.questionNumber >= card.length) {
      let goodAnswers = 0;
      for (let i = 0; i < card.length; i++) {
        if (card[i].answer === this.props.myAnswers[i]) goodAnswers++;
      }
      let score = goodAnswers / card.length;

      let resultEmoji = () => {
        if (score === 0) return 'Does not get it at all 😞';
        if (score > 0 && score < 0.25) return 'Potential to get it one day 🤔';
        if (score >= 0.25 && score < 0.5) return 'Kind of gets it 😐';
        if (score >= 0.5 && score < 0.75) return 'On the road to getting it 🙂';
        if (score >= 0.75 && score < 1) return 'Almost got it! 😄';
        if (score === 1) return 'Got it! 😎';
      };

      return (
        <div className="decks quiz">
          <div className="quiz-card question-card">
            <div className="quiz-title">Results</div>
            <div className="results">
              <div className="emoji">{resultEmoji()}</div>
              {card.map((result, idx) => (
                <div>
                  <div className="result-question">{result.question}</div>
                  <div>Answer: {result.answer}</div>
                  <div
                    className={
                      this.props.myAnswers[idx] === result.answer
                        ? 'result-good-answer'
                        : 'result-bad-answer'
                    }
                  >
                    Your Answer: {this.props.myAnswers[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="decks quiz">
        <div className="quiz-card question-card">
          <div className="quiz-title">
            {card[this.props.questionNumber].question}
          </div>
          <div className="answers">
            {card[this.props.questionNumber].choices.map(answer => (
              <button
                className="choices"
                onClick={() => this.handleAnswer(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (st, props) => {
  return {
    myAnswers: st.answers,
    questionNumber: st.answers.length,
    game: st.decks.find(game => {
      return game.id === props.gameId;
    }),
  };
};

const Game = connect(mapStateToProps)(UnconnectedGame);
export default Game;
