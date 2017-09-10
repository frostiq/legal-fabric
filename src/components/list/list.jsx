import React, { Component } from 'react'
import ListItem from './../list-item'
import './list.css'

class List extends Component {
  render() {
    const {
      items, 
      account, 
      isOracles,
      setAgreementImplementer,
      setAgreementCustomer,
      cancelAgreement,
      finalizeAgreement,
      oracles,
      approveAgreement} = this.props;

    return (
      <div className="list">
        {items.map((item) => <ListItem 
        key={item._id} 
        item={item} 
        account={account} 
        oracles={oracles}
        isOracles={isOracles}
        setAgreementImplementer={setAgreementImplementer}
        setAgreementCustomer={setAgreementCustomer}
        cancelAgreement={cancelAgreement}
        finalizeAgreement={finalizeAgreement}
        approveAgreement={approveAgreement}
        />)}
      </div>
    );
  }
}

export default List
