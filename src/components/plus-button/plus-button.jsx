import React, { Component } from 'react'
import './plus-button.css'

class PlusButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }

    this.handleClick = ::this.handleClick
  }

  handleClick () {
    this.setState((prevState) => ({
      active: !prevState.active,
    }))
  }

  render() {
    return (
      <div
        className={`plus-button ${this.state.active ? 'opened' : 'closed'}`}
        onClick={this.handleClick}>
        <div className="button">
          <div className="horizontal"/>
          <div className="vertical"/>
        </div>
      </div>
    );
  }
}

export default PlusButton
