import React, { Component } from 'react'
import './form.css'

import Button from './../button';
import DatePicker from 'react-datepicker';

class Form extends Component {
  render() {
    const {show} = this.props
    return (
      <form className={`form ${show ? 'form--visible' : ''}`}>
        <div className="form__group">
          <input className="form__group-input" type="text" placeholder="Oracle"/>
          <input className="form__group-input" type="text" placeholder="Oracle"/>
          <input className="form__group-input" type="text" placeholder="Oracle"/>
        </div>
        <div className="form__group">
          <input className="form__group-input width33M25" type="text" placeholder="Rewards"/>
          <input className="form__group-input width33M25" type="text" placeholder="Security deposit"/>
          <DatePicker className="form__group-input" placeholderText="Deadline"/>
        </div>
        <div className="form__button-group">
          <Button name="Create" primary/>
        </div>
      </form>
    );
  }
}

export default Form
