import React, { Component } from 'react'
import LegalFabric from 'build/contracts/LegalFabric.json'
import LegalAgreement from 'build/contracts/LegalAgreement.json'
import { connect } from 'react-redux';
import { toggleForm, initWeb3, createAgreement, getAccounts } from '../../redux/app/app.actions';
import getWeb3 from 'src/utils/getWeb3'

import List from './../list'
import PlusButton from './../plus-button'
import Form from './../form';

import './app.css'

class App extends Component {
  componentDidMount() {
    this.props.initWeb3()
  }

  render() {
    const {showForm, toggleForm, accounts, contracts} = this.props;

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Legal Fabric</a>
        </nav>

        <main className="container">
          <PlusButton showForm={showForm} toggleForm={toggleForm} />
          <Form 
            show={showForm} 
            createAgreement={this.props.createAgreement} 
            accounts={accounts}/>
          <List items={contracts}/>
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    showForm: state.app.showForm,
    accounts: state.app.accounts,
    contracts: state.app.contracts,
  }),
  { toggleForm, initWeb3, createAgreement, getAccounts },
)(App);
