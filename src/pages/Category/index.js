import React from 'react';
import { useParams } from 'react-router-dom';
import useMealsFromCategory from '../../hooks/useMealsFromCategory';

const Category = () => {
  const { category } = useParams();
  const meals = useMealsFromCategory(category);

  return (
    <div className="meals">
      {meals.map(({ id, name, thumbnail }) => (
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
