import React, { Component } from 'react'
import './form.css'
import moment from 'moment';
import Button from './../button';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deadline: moment().add(1, 'day'),
      oracles: (new Array(3).fill()),
    }

    this.onSubmit = ::this.onSubmit;
    this.handleDeadlineChange = ::this.handleDeadlineChange;
    this.handleOracleChange = ::this.handleOracleChange;
  }

  handleDeadlineChange(date) {
    this.setState({
      deadline: date
    })
  }

  handleOracleChange(i) {
    return (selectedOracle) => {
      this.setState((prevState) => ({
        oracles: [
          ...prevState.oracles.slice(0, i),
          selectedOracle.value,
          ...prevState.oracles.slice(i + 1)
        ]
      }))
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target
    console.log(this.state.oracles)
    const params = {
      oracles: this.state.oracles,
      reward: form.reward.value,
      deposit: form.deposit.value,
      deadline: this.state.deadline.valueOf(),
    }
    
   // this.props.createAgreement(params);
  }

  render() {
    const {show, oracles = []} = this.props
    const oracleOptions = oracles.map(({name, address}) => ({ value: address, label: name}))

    return (
      <form className={`form ${show ? 'form--visible' : ''}`} onSubmit={this.onSubmit}>
        <div className="form__group">
          {
            [0, 1, 2].map((i) => 
            <Select  
              key={i}
              className="width33"
              options={oracleOptions}
              clearable={false}
              value={this.state.oracles[i]}
              onChange={this.handleOracleChange(i)}
              placeholder="Oracle"
            />)
          }
        </div>
        <div className="form__group">
          <input 
             className="form__group-input width33M25"
             name="reward"
             type="number" 
             placeholder="Rewards"/>
          <input 
             className="form__group-input width33M25" 
             name="deposit"
             type="number" 
             placeholder="Security deposit"/>
          <DatePicker 
             selected={this.state.deadline}
             dateFormat="YYYY/MM/DD"
             minDate={moment().add(1, 'day')}
             onChange={this.handleDeadlineChange}
             className="form__group-input" 
             placeholderText="Deadline"/>
        </div>
        <div className="form__button-group">
          <Button name="Create" primary type='submit' />
        </div>
      </form>
    );
  }
}

export default Form
