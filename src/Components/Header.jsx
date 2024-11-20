import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
     <Navbar className="bg-body-tertiary " style={{height:"13vh"}}>
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"25px",fontWeight:"bold"}}>
          <i className="fa-solid fa-list-check fa-lg me-2" style={{color: "#598ee8",}} />
            Task-Manager
          </Navbar.Brand>
        </Container>
      </Navbar></>
  )
}

export default Header