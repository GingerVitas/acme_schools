import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store/index';
// import '../public/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
