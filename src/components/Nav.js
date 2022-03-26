import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';


const Nav = ({location: {pathname}, students, campuses}) => {
  if(!students || !campuses) return <h3>Loading...</h3>
  return(
    <div>
      <div id='navContainer'>
        <ul className='nav'>
          <li><Link to='/students' className={pathname === '/students' ? 'selected' : ''} style={{ textDecoration: 'none', color: 'inherit'}}>Students({students.length})</Link></li>
          <li><Link to='/campuses' className={pathname === '/campuses' ? 'selected' : ''} style={{ textDecoration: 'none', color: 'inherit'}}>Campuses({campuses.length})</Link></li>
        </ul>
      </div>
    </div>
  )
}


export default connect(state=>state)(Nav)