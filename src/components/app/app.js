import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toggleForm, initWeb3, createAgreement, getAccounts } from '../../redux/app/app.actions';

import Routes from '../routes.jsx';
import List from './../list'
import PlusButton from './../plus-button'
import Form from './../form';

import './app.css'

class App extends Component {
  componentDidMount() {
    this.props.initWeb3()
  }

  render() {
    const {showForm, toggleForm, account, contracts, oracles} = this.props;

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Legal Fabric</a>
        </nav>

        <Routes/>
      </div>
    );
  }
}

export default connect(
  state => ({
    showForm: state.app.showForm,
    account: state.app.account,
    oracles: state.app.oracles,
    contracts: state.app.contracts,
  }),
  { toggleForm, initWeb3, createAgreement, getAccounts },
)(App);
