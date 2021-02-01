import { useState, useEffect } from 'react';
import { get } from '../utils/apiCaller';
import { sortByObjectProperty } from '../utils/sorter';
import useFavorites from './useFavorites';

const getMealsFromIds = async (favorites) => {
  const mealsFromURLs = await Promise.all(
    favorites.map((favoriteId) => get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favoriteId}`))
  );
  const meals = await Promise.all(mealsFromURLs.map((response) => response.json()));

  return meals
    .map((meal) => meal.meals[0])
    .map(({ idMeal, strMeal, strMealThumb }) => ({
      id: idMeal,
      name: strMeal,
      thumbnail: strMealThumb,
    }))
    .sort(sortByObjectProperty('name'));
};

const useMealsFromCategory = () => {
  const [meals, setMeals] = useState([]);
  const { favorites } = useFavorites();

  const refreshMeals = async (favoritesIds) => {
    const newMeals = await getMealsFromIds(favoritesIds);
    setMeals(newMeals);
  };

  useEffect(() => {
    refreshMeals(favorites);
  }, [favorites]);

  return meals;
};

export default useMealsFromCategory;
