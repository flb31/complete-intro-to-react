// @flow

import React from 'react';
import { shallow, render } from 'enzyme'; // shallow, render,
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import { setSearchTerm } from '../actionCreators';

import preload from '../../data.json';
import Search, { Unwrapped as UnwrappedSearch } from '../Search';
import ShowCard from '../ShowCard';

test('1. Search renders correctly', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  expect(component).toMatchSnapshot();
});

test('2. Search should render correct amount of shows', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('3. Search should render correct amount of shows based on search term WIHTOUT REDUX', () => {
  const searchWord = 'black';
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm={searchWord} />);
  // component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});

test('4. Search should render correct amount of shows based on search term - REDUX', () => {
  const searchWord = 'black';
  store.dispatch(setSearchTerm(searchWord));
  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Search shows={preload.shows} searchTerm={searchWord} />
      </MemoryRouter>
    </Provider>
  );
  // component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find('.show-card').length).toEqual(showCount);
});
