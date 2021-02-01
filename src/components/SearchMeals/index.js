import React from 'react';
import MealCard from '../MealCard/';
import useDebounce from '../../hooks/useDebounce';
import useMealsFromSearchString from '../../hooks/useMealsFromSearchString';
import Search from '../../components/Search';

const SearchMeals = () => {
  const [searchString, setSearchString] = React.useState('');
  const debouncedSearchString = useDebounce(searchString, 300);
  const { loading, meals } = useMealsFromSearchString(debouncedSearchString);
  const handleChange = ({ target: { value } }) => setSearchString(value);

  return (
    <div className="search-meals" data-testid="search-meals">
      <Search currentValue={searchString} onChange={handleChange} placeHolder="Search for meals" testSuffix="search" />
      {loading && <div>Searching for meals...</div>}
      {!meals.length && !loading && debouncedSearchString && (
        <div className="search-meals--no-results" data-testid="no-results">
          No meals found when searching for{' '}
          <span className="search-meals--no-results-search-string">{debouncedSearchString}</span>
        </div>
      )}
      {!loading && (
        <div className="meals full-width">
          {meals.map(({ id, name, thumbnail }) => (
            <MealCard id={id} key={id} name={name} thumbnail={thumbnail} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchMeals;
