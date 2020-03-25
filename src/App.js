import React from 'react';
import './index.css';
import Layout from './components/Layout/Layout'
import CakeBuilder from './containers/CakeBuilder/CakeBuilder'
function App() {
  return (
    <div>
      <Layout>
        <CakeBuilder />
      </Layout>
    </div>
  );
}

export default App;
