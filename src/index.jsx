import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './main.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialDecks } from './data';

const initialState = {
  searchQuery: '',
  answers: [],
  decks: initialDecks,
  title: '',
  newDeck: {
    title: '',
    cards: [{ question: '', choices: ['', ''], answer: '' }],
  },
};

const reducer = function(state, action) {
  switch (action.type) {
    case 'query':
      return { ...state, searchQuery: action.q };
    case 'gameStarted':
      return { ...state, answers: [] };
    case 'questionAnswered':
      return {
        ...state,
        question: state.question++,
        answers: state.answers.concat(action.answer),
      };
    case 'submit':
      return { ...state, decks: state.decks.concat(state.newDeck) };
    case 'clearDeck':
      return {
        ...state,
        newDeck: {
          title: '',
          cards: [{ question: '', choices: ['', ''], answer: '' }],
        },
      };
    case 'newTitle':
      return {
        ...state,
        newDeck: { title: action.title, cards: state.newDeck.cards },
      };
    case 'addCard':
      return {
        ...state,
        newDeck: {
          title: state.title,
          cards: state.newDeck.cards.concat({
            question: '',
            choices: ['', ''],
            answer: '',
          }),
        },
      };
    case 'addChoice':
      const cards = [...state.newDeck.cards];
      cards[action.idx].choices = cards[action.idx].choices.concat('');
      return { ...state, newDeck: { ...state.newDeck, cards } };
    case 'setQuestion':
      const cardQuestion = [...state.newDeck.cards];
      cardQuestion[action.idx].question = action.question;
      return { ...state, newDeck: { ...state.newDeck, cardQuestion } };
    case 'setChoice':
      const cardChoice = [...state.newDeck.cards];
      cardChoice[action.questionId].choices[action.choiceId] = action.text;
      return { ...state, newDeck: { ...state.newDeck, cardChoice } };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
