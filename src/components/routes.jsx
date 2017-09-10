import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import Customer from './customer';
import Oracles from './oracles';

export default class Routes extends React.Component {
  render() {
    return (
      <div className="main__list">
        <Route exact path="/" component={() => <Redirect to="/customer" />} />
        <Route path="/customer" component={Customer} />
        <Route path="/oracles" component={Oracles} />
      </div>
    );
  }
}