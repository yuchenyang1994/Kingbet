import React from 'react';
import App from './App';
import Home from './pages/Home';
import Wallet from './pages/Wallet';

const routes = [{
    path: "/",
    component: App,
    routes: [{
        path: "/",
        exact: true,
        component: Home
    }, {
        path: "/wallet",
        component: Wallet
    }]
}];

export default routes;