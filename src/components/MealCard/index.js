import React from 'react';
import { NavLink } from 'react-router-dom';

import './MealCard.scss';

const MealCard = ({ id, name, thumbnail }) => (
  <div className="meal-card" data-testid="meal-card" key={name}>
    <NavLink to={`/meal/${id}`} data-testid="meal-card-link">
      <div className="meal-card--thumbnail">
        <div className="meal-card--thumbnail-wrapper">
          <img alt={name} src={thumbnail} data-testid="meal-card-thumbnail" />
        </div>
      </div>
      <div className="meal-card--name">{name}</div>
    </NavLink>
  </div>
);

export default MealCard;
