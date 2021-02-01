import React from 'react';
import { NavLink } from 'react-router-dom';

import useFavorites from '../../hooks/useFavorites';

import './MealCard.scss';

const MealCard = ({ id, name, thumbnail }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  return (
    <div className="meal-card" data-testid="meal-card" key={name}>
      <NavLink to={`/meal/${id}`} data-testid="meal-card-link">
        <div className="meal-card--thumbnail">
          <div className="meal-card--thumbnail-wrapper">
            <img alt={name} src={thumbnail} data-testid="meal-card-thumbnail" />
          </div>
        </div>
        <div className="meal-card--name">{name}</div>
      </NavLink>
      <div className="meal-card--favorite" onClick={toggleFavorite}>
        {isFavorite(id) ? '♥' : '♡'}
      </div>
    </div>
  );
};

export default MealCard;
