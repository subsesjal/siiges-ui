import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Loading/index.css';

function LoadingPage({ loading }) {
  return (
    <div className={`loading-page ${loading ? 'active' : ''}`}>
      <div className="loading-content">
        <img src="/LogoJalisco.png" alt="Loading" className="loading-image" />
      </div>
    </div>
  );
}

LoadingPage.defaultProps = {
  loading: false,
};

LoadingPage.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingPage;
