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

import './../app/app.css'

class Oracles extends Component {
  render() {
    const {
        showForm, 
        toggleForm, 
        account,
        contracts, 
        oracles, 
        setAgreementImplementer,
        setAgreementCustomer,
        cancelAgreement,
        finalizeAgreement,
        approveAgreement,
        } = this.props;

    const isOracle = (oracles) => oracles.findIndex((address) => address === account) !== -1

    return (
        <main className="container">
          <List 
            items={contracts.filter(({oracles}) => isOracle(oracles))} 
            account={account} 
            oracles={oracles}
            setAgreementImplementer={setAgreementImplementer}
            setAgreementCustomer={setAgreementCustomer}
            cancelAgreement={cancelAgreement}
            finalizeAgreement={finalizeAgreement}
            approveAgreement={approveAgreement}
            isOracles
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
)(Oracles);