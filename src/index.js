import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import {Provider} from 'react-redux'

import store from './redux/store'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
