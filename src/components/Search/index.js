import React from 'react';

const Search = ({ currentValue, onChange, testSuffix = '' }) => (
  <input
    data-testid={`search${testSuffix !== '' ? `-${testSuffix}` : ''}`}
    onChange={onChange}
    value={currentValue}
    placeholder="Type to filter result"
  />
);

export default Search;
