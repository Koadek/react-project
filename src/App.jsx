import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './main.css';
import SearchResults from './SearchResults.jsx';
import Game from './Game.jsx';
import Navbar from './Navbar.jsx';
import Create from './Create.jsx';

let renderHomePage = () => {
  return <SearchResults />;
};

let renderGame = routerData => {
  let gameId = Number(routerData.match.params.id);
  return <Game gameId={gameId} />;
};

let renderCreate = () => {
  return <Create />;
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact={true} path="/" render={renderHomePage} />
        <Route exact={true} path="/quiz/:id" render={renderGame} />
        <Route exact={true} path="/create" render={renderCreate} />
      </div>
    </BrowserRouter>
  );
}

export default App;
