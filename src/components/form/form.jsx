import React, { Component } from 'react'
import './form.css'

import Button from './../button';

class Form extends Component {
  render() {
    return (
      <form className="form">
        <div className="form__group">
          <input type="text" placeholder="Oracle"/>
          <input type="text" placeholder="Oracle"/>
          <input type="text" placeholder="Oracle"/>
        </div>
        <div className="form__group">
          <input type="text" placeholder="Rewards"/>
          <input type="text" placeholder="Security deposit"/>
          <input type="text" placeholder="Date"/>
        </div>
        <div className="form__button-group">
          <Button name="Create" primary/>
        </div>
      </form>
    );
  }
}

export default Form
