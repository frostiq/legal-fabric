import React, { Component } from 'react'
import Button from './../button'

import FontAwesome from 'react-fontawesome'

import './list-item.css'

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    }

    this.handleClick = ::this.handleClick
    this.handleApprove = ::this.handleApprove
    this.handleApproveCustomer = ::this.handleApproveCustomer
    this.handleApproveImplementer = ::this.handleApproveImplementer
    this.handleCancelAgreement = ::this.handleCancelAgreement
    this.handleFinalizeAgreement = ::this.handleFinalizeAgreement
  }

  handleClick () {
    this.setState((prevState) => ({
       showDetails: !prevState.showDetails, 
    }))
  }

  handleApprove () {
    this.props.approveAgreement({
      item: this.props.item.address,
    })
  }

  handleApproveCustomer () {
    this.props.setAgreementCustomer({
      item: this.props.item,
    })
  }

  handleApproveImplementer () {
    this.props.setAgreementImplementer({
      item: this.props.item,
    })
  }

  handleCancelAgreement () {
    this.props.cancelAgreement({
      item: this.props.item,
    })
  }

  handleFinalizeAgreement () {
    this.props.finalizeAgreement({
      item: this.props.item,
    })
  }

  render() {
    const {
      item, 
      account,
      oracles, 
      isOracles,     
      setAgreementImplementer,
      setAgreementCustomer,
      cancelAgreement,
      finalizeAgreement,
      approveAgreement} = this.props;

    const oraclesNames  =  item.oracles
            .map((oracle) => {
             const o = oracles.find(({address}) => address === oracle)
             return o ? o.name : oracle;
            })  

    const {showDetails} = this.state;

    const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';   

    return (
     <div className={`${showDetails? 'list-item list-item--click' : 'list-item'}`}>
       <div className="list-item__title-block">
        <div className="list-item__header-block">
          <span className="list-item__name">{item.name}</span>
          <span className={`${showDetails? 'list-item__down-arrow list-item__down-arrow-up' : 'list-item__down-arrow'}`} onClick={this.handleClick}></span>
        </div>
        <div className="list-item__buttons-icons">
        <div className="list-item__buttons"> 
          { isOracles ? <Button name="Approve" onClick={this.handleApprove} success/> : null }
        </div>
        <div className="list-item__icons">
            <FontAwesome style={{marginTop: '2px', cursor: 'pointer', marginRight: '5px'}} name="refresh" onClick={this.handleFinalizeAgreement}/>
            <FontAwesome style={{color: 'red', cursor: 'pointer', marginLeft: '10px', marginRight: '5px'}} name="times" onClick={this.handleCancelAgreement}/>
         </div>
        </div> 
       </div>
       {
         showDetails 
          ? <div className="list-item__details-block">
            <span className="list-item__name list-item__desc-item"><strong>Implementer</strong>: {item.implementer === EMPTY_ADDRESS 
              ? <Button name="Approve" onClick={this.handleApproveImplementer} primary/> 
              : item.implementer}</span>
            <span className="list-item__name list-item__desc-item"><strong>Customer:</strong> {item.customer === EMPTY_ADDRESS 
              ? <Button name="Approve" onClick={this.handleApproveCustomer} primary/> 
              : item.customer}</span>
            <span className="list-item__name list-item__desc-item"><strong>Reward:</strong>{item.reward +  ' (ETH)'}</span>
            <span className="list-item__name list-item__desc-item"><strong>Deposit:</strong>{item.deposit +  ' (ETH)'}</span>
            <span className="list-item__name list-item__desc-item"><strong>Deadline:</strong>{item.deadline}</span>
            <span className="list-item__name list-item__desc-item"><strong>Oracles:</strong>{''  +  oraclesNames}</span>
          </div>   
          : null
       }     
     </div>
    );
  }
}

export default ListItem
