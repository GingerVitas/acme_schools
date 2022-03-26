import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudent, loadStudents} from '../store/studentStore';


class Student extends React.Component{
  constructor(props) {
    super(props),
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      email: this.props.student ? this.props.student.email : '',
      imageUrl: this.props.student ? this.props.student.imageUrl : '',
      gpa: this.props.student ? this.props.student.gpa : '',
      campusId: this.props.student && this.props.student.campusID ? this.props.student.campusId*1 : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGPAChange =this.handleGPAChange.bind(this);
  };

  handleChange(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

  handleSubmit(ev){
    ev.preventDefault();
    const student = {...this.props.student, ...this.state};
    this.props.updateStudent(student);
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



  componentDidUpdate(prevProps){
    if(!prevProps.student && this.props.student){
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        gpa: this.props.student.gpa,
        campusId: this.props.student.campusId*1
      })
    }
  }

  render(){
    const {student, campuses, students} = this.props;
    const studentIds = students.map(student => student.id)
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleSubmit, handleGPAChange, handleChange} = this;
    const campus = student ? campuses.find(campus => campus.id === student.campusId) : null
    if(!studentIds.includes(this.props.match.params.id*1)) {
      return (
      <div>
        <h2>Oops! It looks like that student doesn't exist in our database.</h2>
        <h2>Click <Link to='/students'>here</Link> to go back to the student list.</h2>
      </div> 
    ) 
    }
    return(
      <div>
        <h2>Details for {student.firstName} {student.lastName}</h2>
        {!campus ? <h3>Not Currently Enrolled</h3> : <h3>Attends <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3> }
        <form onSubmit={handleSubmit}>
          <input name='firstName' value={firstName} onChange={handleChange} />
          <input name='lastName' value={lastName} onChange={handleChange} />
          <input name='email' value={email} onChange={handleChange} />
          <input name='imageUrl' value={imageUrl} onChange={handleChange} />
          <input name='gpa' value={gpa} type='number' max='4' onChange={handleGPAChange} />
          <select name='campusId' value={campusId === null ? '' : campusId} onChange={ev => this.setState({campusId:ev.target.value*1})}>
            <option value=''>-- Select a Campus --</option>
            {campuses.map(campus => {
              return (
                <option value={campus.id} key={campus.id}>{campus.name}</option>
              )
            })}
          </select>
          <button type='submit'>Update</button>
        </form>
      </div>

    )
  }
};

const mapStateToProps = ({students, campuses}, {match}) => {
  const student = students.find(student => student.id === match.params.id*1)
  return {
    student,
    campuses,
    students
  }
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student, history)),
    loadStudents: () => dispatch(loadStudents())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);