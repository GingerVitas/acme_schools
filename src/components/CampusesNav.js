import React from 'react';
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

const CampusesNav = ({sortHandler, filterHandler}) => {
  return(
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Nav className='me-auto my-2 my-lg-0'>
          <NavDropdown title='Sort'>
            <NavDropdown.Item as='button'><div onClick={()=> sortHandler('')}>Default Order</div></NavDropdown.Item>
            <NavDropdown.Item as='button'><div onClick={()=> sortHandler('enrolledDescending')}>Enrolled Students (Descending)</div></NavDropdown.Item>
            <NavDropdown.Item as='button'><div onClick={()=> sortHandler('enrolledAscending')}>Enrolled Students (Ascending)</div></NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Filter'>
            <NavDropdown.Item as='button'><div onClick={()=> filterHandler('')}>All Campuses</div></NavDropdown.Item>
            <NavDropdown.Item as='button'><div onClick={()=> filterHandler('emptyCampuses')}>No Enrolled Students</div></NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
{/* <ul>
<li>
  Sort
  <ul>
    <li className='link'><button onClick={()=> sortHandler('')}>Default Order</button></li>
    <li className='link'><button onClick={()=> sortHandler('enrolledDescending')}>Enrolled Students (Descending)</button></li>
    <li className='link'><button onClick={()=> sortHandler('enrolledAscending')}>Enrolled Students (Ascending)</button></li>
  </ul>
</li>
<li>
  Filter
  <ul>
   <li className='link'><button onClick={()=> filterHandler('')}>All Campuses</button></li>
   <li className='link'><button onClick={()=> filterHandler('emptyCampuses')}>No Enrolled Students</button></li>
  </ul>
</li>
</ul> */}


export default CampusesNav;