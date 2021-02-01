import React from 'react';

import './Search.scss';

const Search = ({ currentValue, onChange, placeHolder, testSuffix = '' }) => (
  <input
    className="search-input"
    data-testid={`search${testSuffix !== '' ? `-${testSuffix}` : ''}`}
    onChange={onChange}
    placeholder={placeHolder}
    value={currentValue}
  />
);

export default Search;
