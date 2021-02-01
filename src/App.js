import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Loader from './components/Loader/';
import Navigation from './components/Navigation/';
import SiteName from './components/SiteName/';
import useFavorites from './hooks/useFavorites';

import './App.scss';

const Category = lazy(() => import('./routes/Category/'));
const Favorites = lazy(() => import('./routes/Favorites/'));
const Home = lazy(() => import('./routes/Home/'));
const Meal = lazy(() => import('./routes/Meal/'));

export default function App() {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <div className="meal-app">
          <div className="app-bar">
            <div className="wrapper">
              <SiteName text="Meal App" />
              <div className="navigation-wrapper">
                <div className="favorites" title="Go to favorites page">
                  <Link to="/favorites">♥ ({favorites.length})</Link>
                </div>
                <div className="desktop-navigation">
                  <Navigation />
                </div>
                <div className="mobile-app-bar-buttons">
                  <nav
                    className={`mobile-navigation-toggler ${mobileNavigationOpen ? 'active' : ''}`}
                    onClick={() => setMobileNavigationOpen((p) => !p)}
                  >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <main className="wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/category/:category" component={Category} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/meal/:mealId" component={Meal} />
            </Switch>
          </main>
          <nav className={`mobile-navigation ${mobileNavigationOpen ? 'open' : ''}`}>
            <Navigation onClick={setMobileNavigationOpen} />
          </nav>
          <footer>By Björn Wiberg for Mashie</footer>
        </div>
      </Router>
    </Suspense>
  );
}
