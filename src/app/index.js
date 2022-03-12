import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import MainStore from './shared/main.store';
import { HashRouter } from 'react-router-dom';

function render(){

    let rootDoc = document.getElementById('root');

    ReactDOM.render(
	 <Provider store={MainStore}>
	    <HashRouter>
	      <App /> 
	    </HashRouter>
	 </Provider>,
	 rootDoc
    );
}

render();
