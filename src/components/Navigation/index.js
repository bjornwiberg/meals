import React from 'react';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useCategories from '../../hooks/useCategories';

const Navigation = () => {
  const categories = useCategories();

  return (
    <List>
      {categories.map(({ name }, index) => (
        <NavLink activeClassName="selected" data-testid="category-button" to={`/category/${name}`} key={name}>
          <ListItem button>
            <ListItemText primary={name} />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
};

export default Navigation;
