import React from 'react';
import {connect} from 'react-redux';
import {addStudent, loadStudents} from '../store/studentStore';
import StudentCard from './StudentCard';
import CreateStudentForm from './CreateStudentForm';
import StudentPagination from './StudentPagination';
import StudentNav from './StudentNav';
import {Row} from 'react-bootstrap';


class Students extends React.Component {
  constructor(props) {
    super(props),
    this.state ={
      sortView: '',
      filterView: '',
      currentPage: 1,
      studentsPerPage: 10
    }
    this.sortHandler = this.sortHandler.bind(this);
    this.filterHandler = this.filterHandler.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  sortHandler(str) {
    this.setState({sortView: str})
  }
  filterHandler(str) {
    this.setState({filterView: str, currentPage: 1})
  }
  setCurrentPage(page) {
    this.setState({currentPage: page});
  } 
  
  render(){
    const {students, campuses} = this.props;
    const {sortView, filterView, currentPage, studentsPerPage} = this.state;
    const {sortHandler, filterHandler, setCurrentPage} = this
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    let modifiedStudents = 
       sortView === 'lastNameAscending' ? [...students].sort((a, b) => {
        const nameA = a.lastName.toUpperCase(); 
        const nameB = b.lastName.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      : sortView === 'lastNameDescending' ? [...students].sort((a, b) => {
        const nameA = a.lastName.toUpperCase(); 
        const nameB = b.lastName.toUpperCase(); 
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      })
      : sortView === 'GPADescending' ? [...students].sort((a, b) => {
        const gpaA = a.gpa;
        const gpaB = b.gpa;
        if (gpaA > gpaB) {
          return -1;
        }
        if (gpaA < gpaB) {
          return 1;
        }
        return 0;
      })
      : sortView === 'GPAAscending' ? [...students].sort((a, b) => {
        const gpaA = a.gpa;
        const gpaB = b.gpa;
        if (gpaA < gpaB) {
          return -1;
        }
        if (gpaA > gpaB) {
          return 1;
        }
        return 0;
      })
      : [...students].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    
    modifiedStudents = filterView === '' ? modifiedStudents
      : filterView === 'unenrolled' ? modifiedStudents.filter(student => student.campusId === null)
      : campuses.map(campus=> {
        if (filterView === campus.name) return modifiedStudents.filter(student => student.campusId === campus.id)}).flat().filter(item => !!item)

    const currentStudents = modifiedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    
    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
      <div>
        <div className='studentsListContainer'>
          <div className='studentsNav'>
           <StudentNav campuses={campuses} sortHandler={sortHandler} filterHandler={filterHandler} />
          </div>
          <div className='d-inline-flex'>
            <div className='studentCards'>
              <Row xs={1} sm={2}>
                  <StudentCard students={currentStudents} campuses={campuses}/>
              </Row>
            </div>
            <div className='createStudentFormContainer'>
                <CreateStudentForm />
            </div>
          </div>
          <div className='studentPagination' style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
                <StudentPagination studentsPerPage={studentsPerPage} totalModifiedStudents={modifiedStudents.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          </div>
        </div>

      </div>
    )
  }
    
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    addStudent: (student) => dispatch(addStudent(student, history)),
    loadStudents: () => dispatch(loadStudents())
  }
}

export default connect(state=>state, mapDispatchToProps)(Students)