import React from 'react';
import {connect} from 'react-redux'
import {loadStudents} from '../store/studentStore';
import {loadCampuses} from '../store/campusStore';
import {HashRouter, Route, Link} from 'react-router-dom';
import Nav from './Nav';
import Students from './Students';
import Campuses from './Campuses';
import Student from './Student';
import Campus from './Campus';


class App extends React.Component{
  async componentDidMount(){
    await this.loadData()
  }

async loadData(){
    await this.props.loadStudents();
    await this.props.loadCampuses();
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
          <Route exact path='/campuses/:id' component={Campus} />
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