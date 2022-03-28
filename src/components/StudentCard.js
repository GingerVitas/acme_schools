import React from 'react';
import {connect} from 'react-redux';
import {deleteStudent, loadStudents} from '../store/studentStore';
import {Link} from 'react-router-dom';

class StudentCard extends React.Component {
  constructor(props){
    super(props),

    this.deleteFunction = this.deleteFunction.bind(this)
  }

deleteFunction(student){
    const {students} = this.props
    this.props.deleteStudent(student).then(() => {
      if (students[0].id === student.id) {
        return(
          this.props.loadStudents().then(alert('All filtered students removed from database!'))
        )
      } else {
        return alert('Student removed from database!')
      }
    })
  }

  render(){
    const {students, campuses} = this.props
    const {deleteFunction} = this;
    if(!students.length) return (<tr><td>No matching students</td></tr>)
    return(
      students.map(student => {
        const campus = campuses.find(campus => campus.id === student.campusId);
        return (
          <tr key={student.id}>
            <td>
            <Link to={`/students/${student.id}`}><img className='studentCardImg' src={student.imageUrl} /></Link>
              <div className='studentCardName'>{student.firstName} {student.lastName}</div>
              <div className='studentCardEnrollment'>{!campus ? 'Not Currently Enrolled' : `Student at ${campus.name}`}</div>
              <div className='studentCardEmail'>{student.email}</div>
              <div className='studentGpa'>{student.gpa}</div>
            </td>
            <td>
            <button onClick={()=> deleteFunction(student)}>Remove from Database</button>
            </td>
          </tr>
        )
      })
    )
  }
  

}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
};

export default connect(null, mapDispatchToProps)(StudentCard);