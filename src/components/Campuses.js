import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Campuses = ({students, campuses}) => {
  if(!students.length || !campuses.length) return <h3>Loading...</h3>;
  return(
    <div>
      <ul>
        {campuses.map(campus => {
          const enrolledStudents = students.filter(student => student.campusId === campus.id);
          return (<li key={campus.id}>
            {campus.name} ({enrolledStudents.length} enrollments)
            <div>
              <img src={campus.imageUrl} />{campus.address}
            </div>
          </li>
                  
          )
        })}
      </ul>
    </div>

  )
}

export default connect(state=>state)(Campuses)