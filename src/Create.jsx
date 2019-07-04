import { connect } from 'react-redux';
import React, { Component } from 'react';
import QuestionCard from './QuestionCard.jsx';
import {
  Deck,
  Title,
  Quiz,
  CardTitle,
  Form,
  AddCard,
  Submit,
} from './components';

class UnconnectedCreate extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.dispatch({ type: 'submit' });
    this.props.push('/');
  };

  handleNewTitle = evt => {
    this.props.dispatch({ type: 'newTitle', title: evt.target.value });
  };

  addCard = () => {
    this.props.dispatch({ type: 'addCard' });
  };

  render() {
    return (
      <Deck>
        <Quiz>
          <CardTitle>Create a deck</CardTitle>
          <Form onSubmit={this.handleSubmit}>
            <Title>
              <label>Title</label>
              <input
                onChange={this.handleNewTitle}
                value={this.props.newTitle}
              />
            </Title>
            {this.props.myCards.cards.map((question, idx) => (
              <QuestionCard questionId={idx} />
            ))}
            <AddCard type="button" onClick={this.addCard}>
              Add card
            </AddCard>
            <Submit className="choices" type="submit" value="Submit" />
          </Form>
        </Quiz>
      </Deck>
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
