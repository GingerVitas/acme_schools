import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudent} from '../store/studentStore';
import {updateCampus} from '../store/campusStore';


class Campus extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: this.props.campus ? this.props.campus.name : '',
      imageUrl: this.props.campus ? this.props.campus.imageUrl : '',
      address: this.props.campus ? this.props.campus.address : '',
      description: this.props.campus ? this.props.campus.description : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus({...this.props.campus, ...this.state})
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  componentDidUpdate(prevProps){
    if(!prevProps.campus && this.props.campus){
      this.setState({
        name: this.props.campus.name,
        imageUrl: this.props.campus.imageUrl,
        address: this.props.campus.address,
        description: this.props.campus.description
      })
    }
  };


  render(){
    const {name, imageUrl, address, description} = this.state
    const {campus, enrolledStudents} = this.props
    const {handleChange, handleSubmit} = this
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
        <div>
          <form onSubmit={handleSubmit}>
            <input name='name' value={name} onChange={handleChange} placeholder='Name' />
            <input name='imageUrl' value={imageUrl} onChange={handleChange} placeholder='Upload an Image' />
            <input name='address' value={address} onChange={handleChange} placeholder='Address' />
            <textarea name='description' value={description} onChange={handleChange} placeholder='Description' />
            <button type='submit'>Update Campus</button>
          </form>
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