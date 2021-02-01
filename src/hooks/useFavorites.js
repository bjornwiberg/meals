import { useState, useEffect } from 'react';

const saveToLS = (data) => {
  localStorage.setItem('favorites', JSON.stringify(data));
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) ?? []);
  const isFavorite = (mealId) => favorites.includes(mealId);
  const addFavorite = (mealId) =>
    setFavorites((p) => {
      const newFavorites = [...p, mealId];

      return newFavorites;
    });
  const removeFavorite = (mealId) =>
    setFavorites((p) => {
      const newFavorites = p.filter((id) => id !== mealId);

      return newFavorites;
    });

  useEffect(() => {
    saveToLS(favorites);
  }, [favorites]);

  return { isFavorite, favorites, addFavorite, removeFavorite };
};

export default useFavorites;
