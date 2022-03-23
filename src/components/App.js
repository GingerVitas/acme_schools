import React from 'react';
import {connect} from 'react-redux'
import {loadStudents} from '../store/studentStore';
import {loadCampuses} from '../store/campusStore';
import {HashRouter, Route, Link} from 'react-router-dom';


class App extends React.Component{
  componentDidMount(){
    this.props.loadStudents();
    this.props.loadCampuses();
  }

  render(){

    return(
      <HashRouter>
        <div>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><h1>ACME Campus Enrollments</h1></Link>
        </div>
        <nav>
          <h2>Put Nav component here</h2>
        </nav>
        <div className='renderContainer'>
          <h2>Put other routes here</h2>
        </div>
      </HashRouter>
    )
  }
}





const mapDispatchToProps = (dispatch) => {
  return {
    loadStudents: () => dispatch(loadStudents()),
    loadCampuses: () => dispatch(loadCampuses())
  }
}



export default connect(state=>state, mapDispatchToProps)(App)