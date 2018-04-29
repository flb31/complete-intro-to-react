// @flow

import reducers from '../reducers';

test('SET_SEARCH_TERM', () => {
  const state = reducers({ searchTerm: '', apiData: {} }, { type: 'SET_SEARCH_TERM', payload: 'break' });
  expect(state).toEqual({ searchTerm: 'break', apiData: {} });
});

test('ADD_API_DATA', () => {
  const state = reducers(
    { searchTerm: '', apiData: {} },
    {
      type: 'ADD_API_DATA',
      payload: {
        rating: '6.5',
        title: 'Breaking Bad',
        year: '2008–2013',
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        poster: 'bb.jpg',
        imdbID: 'tt0903747',
        trailer: 'XZ8daibM3AE'
      }
    }
  );
  expect(state).toEqual({
    searchTerm: '',
    apiData: {
      tt0903747: {
        rating: '6.5',
        title: 'Breaking Bad',
        year: '2008–2013',
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        poster: 'bb.jpg',
        imdbID: 'tt0903747',
        trailer: 'XZ8daibM3AE'
      }
    }
  });
});

test('ADD_API_DATA with two shows', () => {
  const state = reducers(
    {
      searchTerm: '',
      apiData: {
        tt2085059: {
          rating: '8.0',
          title: 'Black Mirror',
          year: '2011–',
          description: 'A television anthology series that shows the dark side of life and technology.',
          poster: 'bm.jpg',
          imdbID: 'tt2085059',
          trailer: 'jDiYGjp5iFg'
        }
      }
    },
    {
      type: 'ADD_API_DATA',
      payload: {
        rating: '5.5',
        title: 'Atlanta',
        year: '2008–2013',
        description: 'Two cousins, with different views on art versus commerce, on their way up through the Atlanta rap scene; "Earnest \'Earn\' Marks," an ambitious college drop-out and his estranged cousin, who suddenly becomes a star.',
        poster: 'a.jpg',
        imdbID: 'tt4288182',
        trailer: 'MpEdJ-mmTlY'
      }
    }
  );
  expect(state).toEqual({
    searchTerm: '',
    apiData: {
      tt2085059: {
        rating: '8.0',
        title: 'Black Mirror',
        year: '2011–',
        description: 'A television anthology series that shows the dark side of life and technology.',
        poster: 'bm.jpg',
        imdbID: 'tt2085059',
        trailer: 'jDiYGjp5iFg'
      },
      tt4288182: {
        rating: '5.5',
        title: 'Atlanta',
        year: '2008–2013',
        description: 'Two cousins, with different views on art versus commerce, on their way up through the Atlanta rap scene; "Earnest \'Earn\' Marks," an ambitious college drop-out and his estranged cousin, who suddenly becomes a star.',
        poster: 'a.jpg',
        imdbID: 'tt4288182',
        trailer: 'MpEdJ-mmTlY'
      }
    }
  });
});
