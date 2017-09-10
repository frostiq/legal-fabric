import React, { Component } from 'react'
import cx from 'classnames';
import './button.css'

class Button extends Component {
  render() {
    const {name, success, primary, danger, warning, onClick, type = 'button'} = this.props;
    const btnClass = cx({
      button: true,
      'button--success': success,
      'button--primary': primary,
      'button--danger': danger,
      'button--warning': warning,
    });

    return (
        <button className={btnClass} onClick={onClick} type={type}>{name}</button>
    );
  }
}

export default Button
