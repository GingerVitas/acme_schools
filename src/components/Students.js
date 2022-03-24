import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {addStudent, loadStudents, deleteStudent } from '../store/studentStore';


class Student extends React.Component {
  constructor(props) {
    super(props),
    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
  }

  componentDidMount(){
    this.props.loadStudents();
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

  handleGPAChange(ev){
    if (ev.target.value.length > 4) {
      const newGpa = parseFloat(ev.target.value).toFixed(2);
      this.setState({
        gpa: newGpa
      })
    } else {
      this.setState({
        gpa: ev.target.value
      })
    }
  };

  handleSubmit(ev){
    ev.preventDefault();
    const newStudent = {...this.state}
    this.props.addStudent(newStudent)
  }
  
  
  render(){
    const {students, campuses, deleteStudent} = this.props;
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleChange, handleGPAChange, handleSubmit} = this;
    console.log(students)
    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
      <div>
        <div>
          <form onSubmit={handleSubmit}>
          <input name='firstName' value={firstName} placeholder='First Name' onChange={handleChange} />
          <input name='lastName' value={lastName} placeholder='Last  Name' onChange={handleChange} />
          <input name='email' value={email} placeholder='Enter your email' onChange={handleChange} />
          <input name='imageUrl' value={imageUrl} placeholder='Upload your picture' onChange={handleChange} />
          <input name='gpa' type='number' value={gpa ? gpa : ''} placeholder='Enter your GPA' max='4' onChange={handleGPAChange} />
          <select name='campusId' value={campusId} onChange={handleChange}>
            <option value=''>-- Select a Campus --</option>
            {campuses.map(campus => {
              return (
                <option value={campus.id} key={campus.id}>{campus.name}</option>
              )
            })}
          </select>
          <button type='submit'>Enroll!</button>
          </form>
        </div>
        <div>
        <ul>
          {students.map(student => {
            const campus = campuses.find(campus => campus.id === student.campusId)
            return <li key={student.id}><NavLink to={`/students/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
              {student.firstName} {student.lastName} -- {!campus ? 'Not Currently Enrolled' : `Attends ${campus.name}`}
              </div>
            <div>
              <img src={student.imageUrl} /><p>Email: {student.email} GPA: {student.gpa}</p>
            </div>
            </NavLink>
            <button onClick={()=> deleteStudent(student)}>X</button>
            </li>
          } 
        )}
        </ul>
        </div>
      </div>
    )
  }
    
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    addStudent: (student) => dispatch(addStudent(student, history)),
    loadStudents: () => dispatch(loadStudents()),
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
}

export default connect(state=>state, mapDispatchToProps)(Student)