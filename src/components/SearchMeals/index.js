import React from 'react';
import MealCard from '../MealCard/';
import useDebounce from '../../hooks/useDebounce';
import useMealsFromSearchString from '../../hooks/useMealsFromSearchString';

const SearchMeals = () => {
  const [searchString, setSearchString] = React.useState('');
  const debouncedSearchString = useDebounce(searchString, 300);
  const { loading, meals } = useMealsFromSearchString(debouncedSearchString);

  return (
    <div className="search-meals" data-testid="search-meals">
      <input
        placeholder="Search for meals"
        value={searchString}
        onChange={({ target: { value } }) => setSearchString(value)}
      />
      {loading && <div>Searching for meals...</div>}
      {!meals.length && !loading && debouncedSearchString && (
        <div className="search-meals--no-results" data-testid="no-results">
          No meals found when searching for{' '}
          <span className="search-meals--no-results-search-string">{debouncedSearchString}</span>
        </div>
      )}
      {!loading &&
        meals.map(({ id, name, thumbnail }) => <MealCard id={id} key={id} name={name} thumbnail={thumbnail} />)}
    </div>
  );
};

export default SearchMeals;
