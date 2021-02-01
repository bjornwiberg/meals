import React from 'react';
import SearchMeals from '../../components/SearchMeals/';

import './Home.scss';

const RandomMeal = React.lazy(() => import('../../components/RandomMeal'));

const Home = () => {
  return (
    <div className="home">
      <React.Suspense fallback={<div>Loading random meal...</div>}>
        <RandomMeal />
      </React.Suspense>
      <h1>
        Hi and welcome to this meal app, here you can browse for meals by category, get a random meal or search for a
        meal below.
      </h1>
      <SearchMeals />
    </div>
  );
};

export default Home;
