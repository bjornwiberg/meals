import React from 'react';
import { Link } from 'react-router-dom';

import './SiteName.scss';

const SiteName = ({ text }) => {
  return (
    <div className="site-name">
      <Link data-testid="site-name" to="/">
        {text}
      </Link>
    </div>
  );
};

export default SiteName;
