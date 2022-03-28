import React from 'react';
import {connect} from 'react-redux';
import {addStudent, loadStudents} from '../store/studentStore';
import StudentCard from './StudentCard';
import CreateStudentForm from './CreateStudentForm';


class Students extends React.Component {
  constructor(props) {
    super(props),
    this.state ={
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
  
  render(){
    const {students, campuses} = this.props;
    const {sortView, filterView} = this.state;
    const {sortHandler, filterHandler} = this
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


    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
      <div className='studentsContainer'>
        <div className='studentsListContainer'>
          <div className='studentsNav'>
           <ul>
            <li>
              Sort
              <ul>
                <li className='link'><button onClick={()=> sortHandler('')}>Default Order</button></li>
                <li><button onClick={()=>sortHandler('lastNameAscending')}>Last Name Ascending</button></li>
                <li><button onClick={()=>sortHandler('lastNameDescending')}>Last Name Descending</button></li>
                <li><button onClick={()=>sortHandler('GPADescending')}>GPA Descending</button></li>
                <li><button onClick={()=>sortHandler('GPAAscending')}>GPA Ascending</button></li>
              </ul>
            </li>
            <li>
              Filter
              <ul>
                <li className='link'><button onClick={()=>filterHandler('')}>All Students</button></li>
                <li className='link'><button onClick={()=>filterHandler('unenrolled')}>Unenrolled Students</button></li>
                <li>
                  Campuses
                  <ul>
                  {campuses.map(campus => {
                    return(
                      <li className='link' key={campus.id}><button onClick={()=>filterHandler(`${campus.name}`)}>{campus.name}</button></li>
                    )
                  })
                    }
                  </ul>
                </li>
              </ul>
            </li>
           </ul>
          </div>
          <div>
            <table>
              <tbody>
                <StudentCard students={modifiedStudents} campuses={campuses}/>
              </tbody>
            </table>
          </div>
        </div>
        <div className='createStudentFormContainer'>
          <CreateStudentForm />
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