import React, { Component } from 'react'
import Button from './../button'

import './list-item.css'

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    }

    this.handleClick = ::this.handleClick
  }

  handleClick () {
    this.setState((prevState) => ({
       showDetails: !prevState.showDetails, 
    }))
  }

  render() {
    const {item} = this.props;
    const {showDetails} = this.state;

    return (
     <div className={`${showDetails? 'list-item list-item--click' : 'list-item'}`}>
       <div className="list-item__title-block">
        <div>
          <span className="list-item__name">{item.name}</span>
          <span className={`${showDetails? 'list-item__down-arrow list-item__down-arrow-up' : 'list-item__down-arrow'}`} onClick={this.handleClick}></span>
        </div>
        <div className="list-item__buttons">
          <Button name="Accept" success/>
        </div> 
       </div>
       {
         showDetails 
          ? <div className="list-item__details-block">
            <span className="list-item__name">Reward: {item.reward}</span>
            <span className="list-item__name">Deposit: {item.deposit}</span>
          </div>   
          : null
       }     
     </div>
    );
  }
}

export default ListItem
