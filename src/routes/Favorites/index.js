import React from 'react';

import MealCard from '../../components/MealCard/';
import Search from '../../components/Search';
import useDebounce from '../../hooks/useDebounce';
import useMealsFromFavorites from '../../hooks/useMealsFromFavorites';

import './Category.scss';

const getMealsFromFilter = (filter, meals) =>
  meals.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

const Favorites = () => {
  const [filter, setFilter] = React.useState('');
  const debouncedFilter = useDebounce(filter, 300);
  const meals = useMealsFromFavorites();
  const filteredMeals = React.useMemo(() => getMealsFromFilter(debouncedFilter, meals), [debouncedFilter, meals]);
  const handleChange = ({ target: { value } }) => setFilter(value);

  return (
    <div className="category">
      <h1>Favorites</h1>
      <Search
        currentValue={filter}
        onChange={handleChange}
        placeHolder="Type to filter your favorites"
        testSuffix="category"
      />
      <div className="full-width">
        <div className="meals">
          {filteredMeals.map(({ id, name, thumbnail }) => (
            <MealCard id={id} key={id} name={name} thumbnail={thumbnail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
