import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import * as dotenv from 'dotenv';
dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Layout></Layout>
  </BrowserRouter>
);


