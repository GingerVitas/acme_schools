import React from 'react';
import {connect} from 'react-redux'
import {loadStudents} from '../store/studentStore';
import {loadCampuses} from '../store/campusStore';
import {HashRouter, Route, Link, Switch} from 'react-router-dom';
import Home from './Home';
import NavMenu from './NavMenu';
import Students from './Students';
import Campuses from './Campuses';
import Student from './Student';
import Campus from './Campus';
import NotFound from './NotFound';
import {Container} from 'react-bootstrap';

class App extends React.Component{
  async componentDidMount(){
    await this.props.loadStudents();
    await this.props.loadCampuses();
  }

  render(){
    return(
      <HashRouter>
        <Container fluid>
          <header>
            <h1 style={{textAlign:'center', fontSize:'55px'}}><Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>ACME Campus Enrollments</Link></h1>
          </header>
          <Route component={NavMenu}/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/students/:id' component={Student} />
              <Route exact path='/campuses/:id' component={Campus} />
              <Route path='/students' component={Students} />
              <Route path='/campuses' component={Campuses} />
              <Route path='*' component={NotFound} />
            </Switch>
        </Container>  
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



export default connect(state => state, mapDispatchToProps)(App)