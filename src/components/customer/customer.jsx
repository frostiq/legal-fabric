import React, { Component } from 'react'
import { connect } from 'react-redux';
import {    
  toggleForm,
  createAgreement, 
  getAccounts,
  setAgreementImplementer,
  setAgreementCustomer,
  cancelAgreement,
  finalizeAgreement,
  approveAgreement, } from '../../redux/app/app.actions';

import List from './../list'
import PlusButton from './../plus-button'
import Form from './../form';

import './../app/app.css'

class Customer extends Component {
  render() {
    const {
      showForm,
      toggleForm, 
      account, 
      contracts, 
      setAgreementImplementer,
      setAgreementCustomer,
      cancelAgreement,
      finalizeAgreement,
      approveAgreement,
      oracles} = this.props;

    return (
        <main className="container">
          <PlusButton showForm={showForm} toggleForm={toggleForm} />
          <Form 
            show={showForm} 
            createAgreement={this.props.createAgreement} 
            oracles={oracles}/>
          <List 
             items={contracts} 
             account={account}
             oracles={oracles}
             setAgreementImplementer={setAgreementImplementer}
             setAgreementCustomer={setAgreementCustomer}
             cancelAgreement={cancelAgreement}
             finalizeAgreement={finalizeAgreement}
             approveAgreement={approveAgreement}
          />
        </main>
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
  {
    toggleForm,
    createAgreement, 
    getAccounts,
    setAgreementImplementer,
    setAgreementCustomer,
    cancelAgreement,
    finalizeAgreement,
    approveAgreement,
  },
)(Customer);