import { useState, useEffect } from 'react';
import { get } from '../utils/apiCaller';
import { sortByObjectProperty } from '../utils/sorter';

const getMealsFromCategory = async (category) => {
  const response = await get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();
  return meals
    .map(({ idMeal, strMeal, strMealThumb }) => ({
      id: idMeal,
      name: strMeal,
      thumbnail: strMealThumb,
    }))
    .sort(sortByObjectProperty('name'));
};

const useMealsFromCategory = (mealCategory) => {
  const [meals, setMeals] = useState([]);

  const refreshMeals = async (category) => {
    const newMeals = await getMealsFromCategory(category);
    setMeals(newMeals);
  };

  useEffect(() => {
    refreshMeals(mealCategory);
  }, [mealCategory]);

  return meals;
};

export default useMealsFromCategory;
