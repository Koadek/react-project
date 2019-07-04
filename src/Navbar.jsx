import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { NavbarStyle, SearchBar } from './components';

class UnconnectedNavbar extends Component {
  handleQuery = evt => {
    this.props.dispatch({ type: 'query', q: evt.target.value });
  };

  clearDeck = () => {
    this.props.dispatch({ type: 'clearDeck' });
  };

  render() {
    return (
      <NavbarStyle>
        <Link to={'/'} className="link" id="logo">
          GOT IT!
        </Link>
        <SearchBar
          type="text"
          onChange={this.handleQuery}
          value={this.props.query}
        />
        <Link className="link" to={'/'}>
          Home
        </Link>
        <Link className="link" to={'/create'} onClick={this.clearDeck}>
          Create deck
        </Link>
      </NavbarStyle>
    );
  }
}
const mapStateToProps = st => {
  return {
    query: st.searchQuery,
  };
};
let Navbar = connect(mapStateToProps)(UnconnectedNavbar);
export default Navbar;
