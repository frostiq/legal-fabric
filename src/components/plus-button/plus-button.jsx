import React, { Component } from 'react'
import './plus-button.css'

class PlusButton extends Component {
  render() {
    const {showForm, toggleForm} = this.props

    return (
      <div
        className={`plus-button ${showForm ? 'opened' : 'closed'}`}
        onClick={toggleForm}>
        <div className="button">
          <div className="horizontal"/>
          <div className="vertical"/>
        </div>
      </div>
    );
  }
}

export default PlusButton
