import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


const Student = ({students, campuses}) => {
  if(!students.length || !campuses.length) return <h3>Loading...</h3>;
  return(
    <div>
      <ul>
        {students.map(student => {
          const campus = campuses.find(campus => campus.id === student.campusId)
          return <li key={student.id}>{student.firstName} {student.lastName} - attends {campus.name}</li>
        } 
        )}
      </ul>
    </div>
  )
}


export default connect(state=>state)(Student)