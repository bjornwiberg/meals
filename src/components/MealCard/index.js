import React from 'react';
import { NavLink } from 'react-router-dom';

const MealCard = ({ id, name, thumbnail }) => (
  <div className="meal-card" data-testid="meal-card" key={name}>
    <NavLink to={`/meal/${id}`} data-testid="meal-card-link">
      <div>{name}</div>
      <div className="meal-card--thumbnail">
        <img alt={name} src={thumbnail} data-testid="meal-card-thumbnail" />
      </div>
    </NavLink>
  </div>
);

export default MealCard;
