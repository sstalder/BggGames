import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AppModel from './store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const appModel = new AppModel();
const stores = {
    routing: routingStore,
    app: appModel
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
