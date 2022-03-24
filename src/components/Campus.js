import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudent} from '../store/studentStore';
import {updateCampus} from '../store/campusStore';


class Campus extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: '',
      imageUrl: '',
      address: '',
      description: '',
    }
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }


  render(){
    const {campus, enrolledStudents} = this.props
    console.log(campus)
    if(!campus.id) return <h1>Loading....</h1>
    return(
      <div>
        <div>
          <img src={campus.imageUrl} />
          <h2>{campus.name}</h2>
          <h3>{campus.address}</h3>
          <p>{campus.description}</p>
        </div>
        <div>
          <h3>Enrolled Students</h3>
          <ul>
            {enrolledStudents.map(student => {
              return (
                <Link to={`/students/${student.id}`} key={student.id}><li>{student.firstName} {student.lastName}</li></Link>
              )
            })}
          </ul>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = ({students, campuses}, {match}) => {
  const campus = campuses.find(campus => campus.id === match.params.id*1);
  const enrolledStudents = students.filter(student => student.campusId === campus.id);
  return {
    campus,
    enrolledStudents
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    updateStudent: (student) => dispatch(updateStudent(student, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)