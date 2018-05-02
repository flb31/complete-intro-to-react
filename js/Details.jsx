// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPIDetails } from './asyncActionCreators';
import Header from './Header';
import Spinner from './Spinner';

class Details extends Component {
  state = {
    apiData: { rating: '' }
  };

  componentDidMount() {
    if (!this.props.rating) {
      this.props.getApiData();
    }
  }

  props: {
    show: Show,
    rating: string,
    getApiData: Function
  };

  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    const { rating } = this.props;
    let ratingRender;

    if (rating) {
      ratingRender = <h3>{rating}</h3>;
    } else {
      ratingRender = <Spinner />;
    }

    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}!!</h1>
          <h2>({year})</h2>
          {ratingRender}
          <img src={`/public/img/posters/${poster}`} alt={`Poster of ${title}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {};

  return {
    rating: apiData.rating
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  getApiData() {
    dispatch(getAPIDetails(ownProps.show.imdbID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
