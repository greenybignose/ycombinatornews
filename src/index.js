import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Ycombinatornews from './Ycombinatornews';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// architechture here not using route but only single url without another child url
// this is good from security perspective as lots of hacking tools be able to map url to components
    <Ycombinatornews />
);

