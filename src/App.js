import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loader from './components/Loader/';
import Navigation from './components/Navigation/';
import SiteName from './components/SiteName/';

import './App.scss';

const Home = lazy(() => import('./routes/Home/'));
const Category = lazy(() => import('./routes/Category/'));
const Meal = lazy(() => import('./routes/Meal/'));

export default function App() {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <div className="meal-app">
          <div className="app-bar">
            <div className="wrapper">
              <SiteName text="Meal App" />
              <div className="navigation-wrapper">
                <div className="desktop-navigation">
                  <Navigation />
                </div>
                <div className="mobile-app-bar-buttons">
                  <nav
                    class={`mobile-navigation-toggler ${mobileNavigationOpen ? 'active' : ''}`}
                    onClick={() => setMobileNavigationOpen((p) => !p)}
                  >
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <main className="wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/category/:category" component={Category} />
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
