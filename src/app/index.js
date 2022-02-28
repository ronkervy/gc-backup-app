import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import MainStore from './shared/main.store';

function render(){
    ReactDOM.render(
	<Provider store={MainStore}>
	    <App />
	</Provider>,
	document.getElementById('root')
    );
}

render();
