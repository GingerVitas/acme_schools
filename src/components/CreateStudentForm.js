import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStudent} from '../store/studentStore';

class CreateStudentForm extends Component {
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
    this.props.addStudent(newStudent);
    alert(`${this.state.firstName} ${this.state.lastName} has been enrolled!`)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: ''
    })
  }

  render(){
    const {campuses} = this.props
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleChange, handleGPAChange, handleSubmit} = this;

    if(!campuses.length) return <h3>Loading....</h3>;
    return(
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
    )
  }


}

const mapDispatchToProps = dispatch => {
  return {
    addStudent: (student) => dispatch(addStudent(student))
  }
}

export default connect(state => state, mapDispatchToProps)(CreateStudentForm)