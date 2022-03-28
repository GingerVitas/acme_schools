import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CreateCampusForm from './CreateCampusForm';
import CampusCard from './CampusCard';

class Campuses extends React.Component {
  constructor(props){
    super(props),
    this.state = {
      sortView: '',
      filterView: '',
    }
    this.sortHandler = this.sortHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
  }

  sortHandler(str) {
    this.setState({sortView: str})
  }
  filterHandler(str) {
    this.setState({filterView: str})
  }


  render() {
    const {students, campuses} = this.props
    const {sortView, filterView} = this.state;
    const {sortHandler, filterHandler} = this
    
    let modifiedCampuses = 
      sortView === 'enrolledDescending' ? [...campuses].sort((a, b) => {
        const enrolledA = students.filter(student => student.campusId === a.id)
        const enrolledB = students.filter(student => student.campusId === b.id)
        if (enrolledA > enrolledB) {
          return -1;
        }
        if (enrolledA < enrolledB) {
          return 1;
        }
        return 0;
      })
      : sortView === 'enrolledAscending' ? [...campuses].sort((a, b) => {
        const enrolledA = students.filter(student => student.campusId === a.id)
        const enrolledB = students.filter(student => student.campusId === b.id)
        if (enrolledA < enrolledB) {
          return -1;
        }
        if (enrolledA > enrolledB) {
          return 1;
        }
        return 0;
      })
      : [...campuses].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });

    modifiedCampuses = filterView === '' ? modifiedCampuses
      : modifiedCampuses.filter(campus => {
        const enrolledStudents = students.filter(student => student.campusId === campus.id);
        if (!enrolledStudents.length) return campus
      })

    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
    <div className='campusesContainer'>
      <div className='campusListContainer'>
        <div className='campusesNav'>
          <ul>
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
          </ul>
        </div>
        <div>
          <table>
            <CampusCard campuses={modifiedCampuses} students={students} />
          </table>
        </div>
      </div>
      <div className='addCampusFormContainer'>
          <CreateCampusForm />
      </div>
    </div>
  )
  }

}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
  }
}


export default connect(state=>state, mapDispatchToProps)(Campuses)