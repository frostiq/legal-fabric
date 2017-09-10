import React, { Component } from 'react'
import ListItem from './../list-item'
import './list.css'

class List extends Component {
  render() {
    const {items, account} = this.props;
    return (
      <div className="list">
        {items.map((item) => <ListItem key={item._id} item={item} account={account}/>)}
      </div>
    );
  }
}

export default List
