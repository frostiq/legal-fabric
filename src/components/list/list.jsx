import React, { Component } from 'react'
import ListItem from './../list-item'
import './list.css'

class List extends Component {
  render() {
    const {items} = this.props;
    return (
      <div className="list">
        {items.map((item) => <ListItem key={item._id} item={item}/>)}
      </div>
    );
  }
}

export default List
