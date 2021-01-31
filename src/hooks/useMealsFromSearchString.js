import { useState, useEffect } from 'react';
import { get } from '../utils/apiCaller';
import { sortByObjectProperty } from '../utils/sorter';

const getMealsFromSearchString = async (searchString) => {
  const response = await get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`);
  const { meals } = await response.json();
  if (!meals) return [];
  return meals
    .map(({ idMeal, strMeal, strMealThumb }) => ({
      id: idMeal,
      name: strMeal,
      thumbnail: strMealThumb,
    }))
    .sort(sortByObjectProperty('name'));
};

export const useMealsFromSearchString = (searchString) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchForMeals = async (searchString) => {
    if (searchString === '') {
      setMeals([]);
      setLoading(false);
      return;
    }

    const newMeals = await getMealsFromSearchString(searchString);
    setMeals(newMeals);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    searchForMeals(searchString);
  }, [searchString]);

  return { loading, meals };
};

export default useMealsFromSearchString;
