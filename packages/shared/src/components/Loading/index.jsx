import React, { useContext } from 'react';
import { Context } from '../../utils/handlers/context';
import '../../styles/Loading/index.css';

function LoadingPage() {
  const { loading } = useContext(Context);

  return (
    <div className={`loading-page ${loading ? 'active' : ''}`}>
      <div className="loading-content">
        <img src="/LogoJalisco.png" alt="Loading" className="loading-image" />
      </div>
    </div>
  );
}

export default LoadingPage;
