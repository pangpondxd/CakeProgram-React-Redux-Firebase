import React from 'react';
import './index.css';
import Layout from './components/Layout/Layout'
import CookieBuilder from './containers/CookieBuilder/CookieBuilder'
function App() {
  return (
    <div>
      <Layout>
        <CookieBuilder />
      </Layout>
    </div>
  );
}

export default App;
