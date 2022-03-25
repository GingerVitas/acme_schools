import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {expelStudent} from '../store/studentStore';
import {updateCampus, loadCampuses} from '../store/campusStore';


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
  async componentDidMount(){
    await this.props.loadCampuses();
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
    const {campus, campuses, students} = this.props
    const enrolledStudents = campus ? students.filter(student => student.campusId === campus.id) : null;
    const campusIds = campuses.map(campus => campus.id)
    const {handleChange, handleSubmit} = this
    if(!campusIds.includes(this.props.match.params.id*1)) return (
      <div>
        <h2>Oops! It looks like we don't manage that campus yet.</h2>
        <h2>Click <Link to='/campuses'>here</Link> to go back to the campus list.</h2>
      </div> 
    ) 
    if(!campus) return <h2>Loading....</h2>
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
                <li key={student.id}><Link to={`/students/${student.id}`} >{student.firstName} {student.lastName}</Link> <button onClick={()=>this.props.expelStudent(student)}>Expel this student</button></li>
                
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
  return {
    campus,
    campuses,
    students
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    loadCampuses: () => dispatch(loadCampuses()),
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    updateStudent: (student) => dispatch(updateStudent(student, history)),
    expelStudent: (student) => dispatch(expelStudent(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)