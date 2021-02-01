import React, { useState, useEffect } from 'react';
import { get } from '../../utils/apiCaller';
import './RandomMeal.scss';
import { NavLink } from 'react-router-dom';

const getRandomMeal = async () => {
  const response = await get('https://www.themealdb.com/api/json/v1/1/random.php');
  const {
    meals: [{ idMeal, strMeal, strMealThumb }],
  } = await response.json();
  return {
    id: idMeal,
    name: strMeal,
    thumbnail: strMealThumb,
  };
};

const RandomMeal = () => {
  const [meal, setMeal] = useState([]);

  const refreshRandomMeal = async () => {
    const newRandomMeal = await getRandomMeal();
    setMeal(newRandomMeal);
  };

  useEffect(() => {
    refreshRandomMeal();
  }, []);

  return (
    <div className="full-width" data-testid="random-meal">
      <div className="random-meal">
        <div className="meal">
          <div className="meal--image">
            <NavLink to={`/meal/${meal.id}`} data-testid="random-meal-link">
              <img data-testid="random-meal-image" src={meal.thumbnail} alt={meal.name} />
              <div className="meal--name">{meal.name}</div>
            </NavLink>
            <div className="random-meal--refresh" data-testid="random-meal-refresh" onClick={refreshRandomMeal}>
              get a new random meal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomMeal;
