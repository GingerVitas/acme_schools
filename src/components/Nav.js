import React from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';


const Nav = ({location: {pathname}}) => {
  return(
    <div>
      <div id='navContainer'>
        <ul className='nav'>
          <li><Link to='/students' className={pathname === '/students' ? 'selected' : ''} style={{ textDecoration: 'none'}}>Students</Link></li>
          <li><Link to='/campuses' className={pathname === '/campuses' ? 'selected' : ''} style={{ textDecoration: 'none'}}>Campuses</Link></li>
        </ul>
      </div>
    </div>
  )
}


export default connect(state=>state)(Nav)