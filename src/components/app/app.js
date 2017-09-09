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
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentDidMount() {
    this.props.initWeb3()
    .then(() => this.props.getAccounts())
  }

  render() {
    const {showForm, toggleForm, accounts} = this.props;

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
          <List items={[{_id: 1, name: 'Contract_A'}, {_id: 2, name: 'Contract_B'}]}/>
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    showForm: state.app.showForm,
    accounts: state.app.accounts,
  }),
  { toggleForm, initWeb3, createAgreement, getAccounts },
)(App);
