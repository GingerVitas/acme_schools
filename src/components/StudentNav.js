import React from 'react';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

const StudentNav = ({campuses, sortHandler, filterHandler}) => {

  return(
    <Navbar bg="light" expand="lg">
      <Container fluid>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
      >
        <NavDropdown title="Sort">
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('')}>Default Order</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('lastNameAscending')}>Last Name Ascending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('lastNameDescending')}>Last Name Descending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('GPADescending')}>GPA Descending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('GPAAscending')}>GPA Ascending</div></NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Filter' navbarScroll>
          <NavDropdown.Item as='button'><div onClick={()=>filterHandler('')}>All Students</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=>filterHandler('unenrolled')}>Unenrolled Students</div></NavDropdown.Item>
          <NavDropdown title='Campuses' navbarScroll style={{maxHeight: '100px'}}>
            {campuses.map(campus => {
                return(
                  <NavDropdown.Item as='button' key={campus.id}><div onClick={()=>filterHandler(`${campus.name}`)}>{campus.name}</div></NavDropdown.Item>
                )
              })
                }
          </NavDropdown>
        </NavDropdown>
      </Nav>
      </Container>
    </Navbar>
  )
}

export default StudentNav;



