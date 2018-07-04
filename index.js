import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './app';
import buildStore from './redux/store';

const store = buildStore();
const Boot = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
AppRegistry.registerComponent('MPWU', () => Boot);
