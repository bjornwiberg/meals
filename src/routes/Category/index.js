import React from 'react';
import { useParams } from 'react-router-dom';

import MealCard from '../../components/MealCard/';
import Search from '../../components/Search/';
import useDebounce from '../../hooks/useDebounce';
import useMealsFromCategory from '../../hooks/useMealsFromCategory';

const getMealsFromFilter = (filter, meals) =>
  meals.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

const Category = () => {
  const [filter, setFilter] = React.useState('');
  const debouncedFilter = useDebounce(filter, 300);
  const { category } = useParams();
  const meals = useMealsFromCategory(category);
  const filteredMeals = React.useMemo(() => getMealsFromFilter(debouncedFilter, meals), [debouncedFilter, meals]);
  const handleSearch = ({ target: { value } }) => setFilter(value);

  return (
    <div className="meals">
      <Search currentValue={filter} onChange={handleSearch} testSuffix="category" />
      {filteredMeals.map(({ id, name, thumbnail }) => (
        <MealCard id={id} key={id} name={name} thumbnail={thumbnail} />
      ))}
    </div>
  );
};

export default Category;
