import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles.css";
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import TopVulnerabilities from './components/TopVulnerabilities'
import ThreatProliferation from './components/ThreatProliferation';
import ImpactOverTheYears from './components/ImpactOverTheYears';
import ThreatsChangedOverTime from './components/ThreatsChangedOverTime';
import Clustering from './components/Clustering';
import VendorsSection from './components/VendorsSection';
import ProductsSection from './components/ProductsSection';
import Dashboard from './components/Dashboard';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/TopVulnerabilities' element={<TopVulnerabilities/>} />
        <Route path='/ThreatProliferation' element={<ThreatProliferation/>} />
        <Route path='/ImpactOverTheYears' element={<ImpactOverTheYears/>} />
        <Route path='/ThreatsChangedOverTime' element={<ThreatsChangedOverTime/>} />
        <Route path='/Clustering' element={<Clustering/>} />
        <Route path='/VendorsSection' element={<VendorsSection/>} />
        <Route path='/ProductsSection' element={<ProductsSection/>} />
        <Route path='/' element={<App/>} />
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>
);
