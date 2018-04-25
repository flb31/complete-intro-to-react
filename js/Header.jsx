// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm } from './actionCreators';

const Header = (props: { showSearch?: boolean, handleSearchTermChange: Function, searchTerm: string }) => {
  let search;

  if (props.showSearch) {
    search = (
      <input onChange={props.handleSearchTermChange} value={props.searchTerm} type="text" placeholder="Search" />
    );
  } else {
    search = (
      <h2>
        <Link to="/search">
          back
        </Link>
      </h2>
    );
  }

  return (
    <header>
      <h1>
        <Link to="/">svideo</Link>
      </h1>
      {search}
    </header>
  );
};

Header.defaultProps = {
  showSearch: false
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
