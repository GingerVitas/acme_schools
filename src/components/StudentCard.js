import React from 'react';
import {connect} from 'react-redux';
import {deleteStudent} from '../store/studentStore';

const StudentCard = ({students, campuses, deleteStudent}) => {
  return(
    students.map(student => {
      const campus = campuses.find(campus => campus.id === student.campusId);
      return (
        <tr key={student.id}>
          <td>
            <img className='studentCardImg' src={student.imageUrl} />
            <div className='studentCardName'>{student.firstName} {student.lastName}</div>
            <div className='studentCardEnrollment'>{!campus ? 'Not Currently Enrolled' : `Student at ${campus.name}`}</div>
            <div className='studentCardEmail'>{student.email}</div>
            <div className='studentGpa'>{student.gpa}</div>
          </td>
          <td>
          <button onClick={()=> deleteStudent(student)}>Remove from Database</button>
          </td>
        </tr>
      )
    })
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
};

export default connect(state=>state, mapDispatchToProps)(StudentCard);