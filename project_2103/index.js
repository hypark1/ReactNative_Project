import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '~/reducers';

const store = createStore(reducers);
const render = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

store.subscribe(render);

AppRegistry.registerComponent(appName, () => render);
