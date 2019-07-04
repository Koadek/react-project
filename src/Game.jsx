import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Deck,
  Quiz,
  CardTitle,
  ReportCard,
  Emoji,
  Results,
  ResultQuestion,
  MyAnswer,
  ChoiceBtn,
} from './components';

class UnconnectedGame extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'gameStart' });
  }
  handleAnswer = answer => {
    this.props.dispatch({ type: 'questionAnswered', answer: answer });
  };
  render() {
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
        <Deck>
          <Quiz>
            <CardTitle>Results</CardTitle>
            <ReportCard>
              <Emoji>{resultEmoji()}</Emoji>
              {card.map((result, idx) => (
                <Results>
                  <ResultQuestion>{result.question}</ResultQuestion>
                  <div>Answer: {result.answer}</div>
                  <MyAnswer
                    myAnswer={this.props.myAnswers[idx] === result.answer}
                  >
                    Your Answer: {this.props.myAnswers[idx]}
                  </MyAnswer>
                </Results>
              ))}
            </ReportCard>
            <Link className="choices link" to={'/quiz/' + this.props.game.id}>
              Play again
            </Link>
          </Quiz>
        </Deck>
      );
    }

    return (
      <Deck>
        <Quiz>
          <CardTitle>{card[this.props.questionNumber].question}</CardTitle>
          <Quiz>
            {card[this.props.questionNumber].choices.map(answer => (
              <ChoiceBtn onClick={() => this.handleAnswer(answer)}>
                {answer}
              </ChoiceBtn>
            ))}
          </Quiz>
        </Quiz>
      </Deck>
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
