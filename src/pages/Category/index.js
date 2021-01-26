import React from 'react';
import { useParams } from 'react-router-dom';

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
        <div className="meals--meal" data-testid="meal" key={name}>
          <div>{name}</div>
          <div className="meal--thumbnail">
            <img src={thumbnail} alt={name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
