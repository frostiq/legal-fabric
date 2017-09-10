import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import store from './redux/store'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-select/dist/react-select.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
