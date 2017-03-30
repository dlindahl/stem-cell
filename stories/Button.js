import React from 'react'

const buttonStyles = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #eee',
  borderRadius: 3,
  cursor: 'pointer',
  fontSize: 15,
  margin: 10,
  padding: '3px 10px'
}

const Button = ({ children, onClick }) => (
  <button style={buttonStyles} onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
}

export default Button
