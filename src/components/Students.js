import React from 'react';
import {connect} from 'react-redux';
import {addStudent, loadStudents, sortStudentsAscending, sortStudentsDescending, sortStudentsGpaAscending, sortStudentsGpaDescending, sortStudentsDefault, filterUnenrolledStudents } from '../store/studentStore';
import StudentCard from './StudentCard';


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
    this.filterUnenrolledStudents = this.filterUnenrolledStudents.bind(this);
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
  
  filterUnenrolledStudents(){
    const {students} = this.props
    if (!students.filter(student => student.campusId === null).length) {
      return (this.props.loadStudents()).then(alert('All students are registered!'))
        
    }
    else {
      return this.props.filterUnenrolledStudents();
    }
  }
  
  render(){
    const {students, campuses, sortStudentsAscending, sortStudentsDescending, sortStudentsGpaAscending, sortStudentsGpaDescending, sortStudentsDefault, loadStudents} = this.props;
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleChange, handleGPAChange, handleSubmit, filterUnenrolledStudents} = this;
    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
      <div className='studentsContainer'>
        <div className='studentsListContainer'>
          <div className='studentSort'>
            <ul>
              <li><button className='dropButton'>Sort</button></li>
            </ul>
           
            <div className='dropContent'>
              <button onClick={() => sortStudentsDefault()}>Sort by Default</button>
              <button onClick={() => sortStudentsAscending()}>Sort by Last Name (ascending)</button>
              <button onClick={() => sortStudentsDescending()}>Sort by Last Name (descending)</button>
              <button onClick={() => sortStudentsGpaAscending()}>Sort by GPA (ascending)</button>
              <button onClick={() => sortStudentsGpaDescending()}>Sort by GPA (descending)</button>
            </div>
            <button className='dropButton'>Filter</button>
            <div className='dropContent'>
              <button onClick={() => sortStudentsGpaDescending()}>Sort by GPA (descending)</button>
              <button onClick={() => filterUnenrolledStudents()}>See Unenrolled Students</button>
              <button onClick={() => loadStudents()}>View All Students</button>
            </div>
          </div>
          <table>
            <tbody>
              <StudentCard />
            </tbody>
          </table>
        </div>
        <div className='createStudentFormContainer'>
          <form onSubmit={handleSubmit}>
          <input name='firstName' value={firstName} placeholder='First Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a first name')}/>
          <input name='lastName' value={lastName} placeholder='Last  Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a last name')}/>
          <input name='email' value={email} placeholder='Enter your email' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a valid email address')}/>
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
      </div>
    )
  }
    
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    addStudent: (student) => dispatch(addStudent(student, history)),
    loadStudents: () => dispatch(loadStudents()),
    sortStudentsDefault: () => dispatch(sortStudentsDefault()),
    sortStudentsAscending: () => dispatch(sortStudentsAscending()),
    sortStudentsDescending: () => dispatch(sortStudentsDescending()),
    sortStudentsGpaAscending: ()=> dispatch(sortStudentsGpaAscending()),
    sortStudentsGpaDescending: ()=> dispatch(sortStudentsGpaDescending()),
    filterUnenrolledStudents: () => dispatch(filterUnenrolledStudents())
  }
}

export default connect(state=>state, mapDispatchToProps)(Student)