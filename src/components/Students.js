import React from 'react';
import {connect} from 'react-redux';
import {addStudent, sortStudentsAscending, sortStudentsDescending, sortStudentsGpaAscending, sortStudentsGpaDescending } from '../store/studentStore';
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
    const {students, campuses, sortStudentsAscending, sortStudentsDescending, sortStudentsGpaAscending, sortStudentsGpaDescending} = this.props;
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleChange, handleGPAChange, handleSubmit} = this;
    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
      <div className='studentsContainer'>
        <div className='studentsListContainer'>
          <div className='studentSort'>
            <button onClick={() => sortStudentsAscending()}>Sort by Last Name (ascending)</button>
            <button onClick={() => sortStudentsDescending()}>Sort by Last Name (descending)</button>
            <button onClick={() => sortStudentsGpaAscending()}>Sort by GPA (ascending)</button>
            <button onClick={() => sortStudentsGpaDescending()}>Sort by GPA (descending)</button>
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
    deleteStudent: (student) => dispatch(deleteStudent(student)),
    sortStudentsAscending: () => dispatch(sortStudentsAscending()),
    sortStudentsDescending: () => dispatch(sortStudentsDescending()),
    sortStudentsGpaAscending: ()=> dispatch(sortStudentsGpaAscending()),
    sortStudentsGpaDescending: ()=> dispatch(sortStudentsGpaDescending())
  }
}

export default connect(state=>state, mapDispatchToProps)(Student)