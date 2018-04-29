// @flow

import moxios from 'moxios';
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators';

const show = {
  title: 'Billions',
  year: '2016–',
  description: 'U.S. Attorney Chuck Rhoades goes after hedge fund king, Bobby "Axe" Axelrod in a battle between two powerful New York figures.',
  poster: 'b.jpg',
  imdbID: 'tt4270492',
  trailer: '_raEUMLL-ZI'
};

test('setSearchTerm', () => {
  expect(setSearchTerm('house')).toMatchSnapshot();
});

test('addAPIData', () => {
  expect(addAPIData(show)).toMatchSnapshot();
});

test('getAPIDetails', (done: Function) => {
  const dispatchMock = jest.fn();

  moxios.withMock(() => {
    getAPIDetails(show.imdbID)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: show
        })
        .then(() => {
          expect(request.url).toEqual(`http://localhost:3000/${show.imdbID}`);
          expect(dispatchMock).toBeCalledWith(addAPIData(show));
          done();
        });
    });
  });
});
