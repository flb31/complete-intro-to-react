import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // static, render, shallow
import Search from '../Search';
import ShowCard from '../ShowCard';
import preload from '../../data.json';

// test('Search renders correctly', () => {
//   const component = renderer.create(<Search />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

test('Search renders correctly', () => {
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
});

test('Search ammount show cards', () => {
  const component = shallow(<Search />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amunt of show based on search term', () => {
  const searchWord = 'black';
  const component = shallow(<Search />);
  component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});
