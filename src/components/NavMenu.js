import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Navbar, Container, Nav} from 'react-bootstrap';


const NavMenu = ({students, campuses}) => {
  if(!students || !campuses) return <h3>Loading...</h3>
  return(
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container fluid>
        <Nav className='me-auto'>
          <Nav.Link as={NavLink} to='/students'>Students({students.length})</Nav.Link>
          <Nav.Link as={NavLink} to='/campuses'>Campuses({campuses.length})</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}


export default connect(state=>state)(NavMenu)