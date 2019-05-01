import React from 'react';
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {

  return (
    <Navbar bg="light">
      <Navbar.Brand>Dispatchly</Navbar.Brand>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/organizations">Edit your Organization</Nav.Link>
    </Navbar>
  );
}

// NavBar.propTypes = {
  
// };