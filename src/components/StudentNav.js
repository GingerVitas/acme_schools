import React from 'react';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

const StudentNav = ({campuses, sortHandler, filterHandler}) => {

  return(
    <Navbar bg="light" expand="lg" style={{position:'sticky', top:'55px', zIndex:'25'}}>
      <Container fluid>
      <Nav
        className="me-auto my-2 my-lg-0"
      >
        <NavDropdown title="Sort">
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('')}>Default Order</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('lastNameAscending')}>Last Name Ascending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('lastNameDescending')}>Last Name Descending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('GPADescending')}>GPA Descending</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=> sortHandler('GPAAscending')}>GPA Ascending</div></NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Filter'>
          <NavDropdown.Item as='button'><div onClick={()=>filterHandler('')}>All Students</div></NavDropdown.Item>
          <NavDropdown.Item as='button'><div onClick={()=>filterHandler('unenrolled')}>Unenrolled Students</div></NavDropdown.Item>
          {/*<NavDropdown title='Campuses' style={{overflowY:'auto', minHeight:'50px'}}>
            {campuses.map(campus => {
                return(
                  <NavDropdown.Item as='button' key={campus.id} minheight={'50px'}><div onClick={()=>filterHandler(`${campus.name}`)}>{campus.name}</div></NavDropdown.Item>
                )
              })
                }
              </NavDropdown> Commented out because I can't get the nesting to work right, and unwieldy for 200 campuses*/}
        </NavDropdown>
      </Nav>
      </Container>
    </Navbar>
  )
}

export default StudentNav;



