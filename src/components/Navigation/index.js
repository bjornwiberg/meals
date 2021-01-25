import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useCategories from '../../hooks/useCategories';

const Navigation = () => {
  const categories = useCategories();

  return (
    <List>
      {categories.map(({ name }, index) => (
        <ListItem data-testid="category-button" button key={name}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
