import React, { Component } from 'react'
import Button from './../button'

import './list-item.css'

class ListItem extends Component {
  render() {
    const {item} = this.props;
    return (
     <div className="list-item">
       <span className="list-item__name">{item.name}</span>
       <div className="list-item__buttons">
         <Button name="Accept" success/>
         <Button name="Decline" danger/>
       </div>
     </div>
    );
  }
}

export default ListItem
