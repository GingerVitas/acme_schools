import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudent} from '../store/studentStore';


class Student extends React.Component{
  constructor(props) {
    super(props),
    console.log('CONSTRUCTOR STUDENT TEST', this.props.student)
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      email: this.props.student ? this.props.student.email : '',
      imageUrl: this.props.student ? this.props.student.imageUrl : '',
      gpa: this.props.student ? this.props.student.gpa : '',
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
    this.props.updateStudent({...this.props.student, ...this.state})
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
        gpa: this.props.student.gpa
      })
    }
  }

  render(){
    const {student, campus} = this.props;
    const {firstName, lastName, email, imageUrl, gpa} = this.state;
    const {handleSubmit, handleGPAChange, handleChange} = this;
    if(!student || !campus) return null
    return(
      <div>
        <h2>Details for {student.firstName} {student.lastName}</h2>
        <h3>Attends <Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
        <form onSubmit={handleSubmit}>
          <input name='firstName' value={firstName} onChange={handleChange} />
          <input name='lastName' value={lastName} onChange={handleChange} />
          <input name='email' value={email} onChange={handleChange} />
          <input name='imageUrl' value={imageUrl} onChange={handleChange} />
          <input name='gpa' value={gpa} type='number' max='4' onChange={handleGPAChange} />
          <button type='submit'>Udpate</button>
        </form>
      </div>

    )
  }
};

const mapStateToProps = ({students, campuses}, {match}) => {
  const student = students.find(student => student.id === match.params.id*1)
  const campus = campuses.find(campus => campus.id === student.campusId)
  return {
    student,
    campus
  }
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);