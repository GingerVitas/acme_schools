import React from 'react';
import {connect} from 'react-redux';
import CreateCampusForm from './CreateCampusForm';
import CampusCard from './CampusCard';
import CampusesNav from './CampusesNav';
import CampusPagination from './CampusPagination';

class Campuses extends React.Component {
  constructor(props){
    super(props),
    this.state = {
      sortView: '',
      filterView: '',
      currentPage: 1,
      campusesPerPage: 10
    }
    this.sortHandler = this.sortHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  sortHandler(str) {
    this.setState({sortView: str})
  }
  filterHandler(str) {
    this.setState({filterView: str})
  }
  paginate(page) {
    this.setState({currentPage: page});
  } 

  render() {
    const {students, campuses} = this.props
    const {sortView, filterView, currentPage, campusesPerPage} = this.state;
    const {sortHandler, filterHandler, paginate} = this

    const indexOfLastCampus = currentPage * campusesPerPage;
    const indexOfFirstCampus = indexOfLastCampus - campusesPerPage;
    
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

    const currentCampuses = modifiedCampuses.slice(indexOfFirstCampus, indexOfLastCampus);

    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
    <div className='campusesContainer'>
      <div className='campusListContainer'>
        <div className='campusesNav'>
          <CampusesNav sortHandler={sortHandler} filterHandler={filterHandler} />
        </div>
        <div>
          <table>
            <CampusCard campuses={currentCampuses} students={students} />
          </table>
        </div>
        <div>
          <CampusPagination campusesPerPage={campusesPerPage} totalModifiedCampuses={modifiedCampuses.length} paginate={paginate}/>
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