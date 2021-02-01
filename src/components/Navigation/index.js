import React from 'react';
import { NavLink } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';

const Navigation = ({ onClick = () => {} }) => {
  const categories = useCategories();

  return (
    <ul className="navigation">
      <li className="navigation--item navigation--item__top-level">
        <span className="title">By category</span>
        <div className="navigation--submenu">
          <ul>
            {categories.map(({ name }) => (
              <li className="navigation--item" key={name} onClick={() => onClick(false)}>
                <NavLink activeClassName="selected" data-testid="category-link" to={`/category/${name}`}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default Navigation;
