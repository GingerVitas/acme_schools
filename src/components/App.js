import React from 'react';
import {connect} from 'react-redux'
import {loadStudents} from '../store/studentStore';
import {loadCampuses} from '../store/campusStore';
import {HashRouter, Route, Link} from 'react-router-dom';
import Nav from './Nav';
import Students from './Students';
import Campuses from './Campuses';
import Student from './Student';


class App extends React.Component{
  componentDidMount(){
    this.props.loadStudents();
    this.props.loadCampuses();
  }

  render(){
    return(
      <HashRouter>
        <header>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><h1>ACME Campus Enrollments</h1></Link>
        </header>
        <nav>
          <Route component={Nav}/>
        </nav>
        <div className='renderContainer'>
          <Route exact path='/students' component={Students} />
          <Route exact path='/campuses' component={Campuses} />
          <Route exact path='/students/:id' component={Student} />
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