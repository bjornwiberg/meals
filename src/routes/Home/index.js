import React from 'react';

import './Home.scss';

const RandomMeal = React.lazy(() => import('../../components/RandomMeal'));

const Home = () => {
  return (
    <div className="home">
      <React.Suspense fallback={<div>Loading random meal...</div>}>
        <RandomMeal />
      </React.Suspense>
      <div className="home--description">
        Hi and welcome to this meal app, here you can look for meals by catogory, get a random meal and much more.
      </div>
    </div>
  );
};

export default Home;
