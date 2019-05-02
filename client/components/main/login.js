import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Login(props) {
  const style = {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw'
  };

  const handleClick = function(e) {
    e.preventDefault();
    props.history.push('/login');
  }

  return (
      <div style={style}>
        <div>
          Welcome to Dispatchly!
        </div>
        <div>
          <Button onClick={handleClick}>Login</Button>
        </div>
      </div>
  );
}