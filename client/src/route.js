import App from './App';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import CreateAccount from './pages/CreateAccount';

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
    }, {
        path: "/createAccount",
        component: CreateAccount
    }]
}];

export default routes;