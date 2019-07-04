import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './main.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialDecks } from './data';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

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
    case 'gameStart':
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
          id: state.decks.length,
          title: '',
          cards: [{ question: '', choices: ['', ''], answer: '' }],
        },
      };
    case 'newTitle':
      return {
        ...state,
        newDeck: { ...state.newDeck, title: action.title },
      };
    case 'addCard':
      return {
        ...state,
        newDeck: {
          ...state.newDeck,
          cards: state.newDeck.cards.concat({
            question: '',
            choices: ['', ''],
            answer: '',
          }),
        },
      };
    case 'removeCard': {
      const cards = [...state.newDeck.cards];
      cards.splice(action.idx, 1);
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    case 'addChoice': {
      const cards = [...state.newDeck.cards];
      cards[action.idx].choices = cards[action.idx].choices.concat('');
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    case 'removeChoice': {
      const cards = [...state.newDeck.cards];
      const choices = [...cards[action.questionId].choices];
      choices.splice(action.choiceId, 1);
      cards[action.questionId].choices = choices;
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    case 'setQuestion': {
      const cards = [...state.newDeck.cards];
      cards[action.idx].question = action.question;
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    case 'setChoice': {
      const cards = [...state.newDeck.cards];
      const choices = [...cards[action.questionId].choices];
      choices[action.choiceId] = action.text;
      cards[action.questionId].choices = choices;
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    case 'setAnswer': {
      const cards = [...state.newDeck.cards];
      cards[action.questionId] = {
        ...cards[action.questionId],
        answer: cards[action.questionId].choices[action.choiceId],
      };
      return { ...state, newDeck: { ...state.newDeck, cards } };
    }
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(
  persistedReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(store);

export default () => {
  store;
  persistor;
  return { store, persistor };
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
