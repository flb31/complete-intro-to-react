import React, { Component } from 'react';
import ShowCard from './ShowCard';
import preload from '../data.json';

class Search extends Component {
  state = {
    search: ''
  };

  handleChangeSearch = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    return (
      <div className="search">
        <header>
          <h1>svideo</h1>
          <input
            type="text"
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleChangeSearch}
          />
        </header>

        <div>
          {preload.shows
            .filter(
              show =>
                `${show.title} ${show.description}`
                  .toUpperCase()
                  .indexOf(this.state.search.toUpperCase()) >= 0
            )
            .map(show => <ShowCard key={show.imdbID} {...show} />)}
        </div>

      </div>
    );
  }
}

export default Search;
