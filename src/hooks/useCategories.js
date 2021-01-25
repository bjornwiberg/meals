import { useState, useEffect } from 'react';
import { get } from '../utils/apiCaller';
import { sortByObjectProperty } from '../utils/sorter';

const getCategories = async () => {
  const response = await get('https://www.themealdb.com/api/json/v1/1/categories.php');
  const { categories } = await response.json();
  return categories
    .map(({ idCategory, strCategory, strCategoryThumb, strCategoryDescription }) => ({
      id: idCategory,
      name: strCategory,
      thumbnail: strCategoryThumb,
      description: strCategoryDescription,
    }))
    .sort(sortByObjectProperty('name'));
};

const UseCategories = () => {
  const [categories, setCategories] = useState([]);

  const refreshCategories = async () => {
    const newCategories = await getCategories();
    setCategories(newCategories);
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  return categories;
};

export default UseCategories;
