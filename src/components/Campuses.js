import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCampus, deleteCampus} from '../store/campusStore';
import {updateMultiple} from '../store/studentStore';

class Campuses extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      address: '',
      description: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleSubmit(ev){
    ev.preventDefault();
    this.props.createCampus({...this.state});
  }

  handleChange(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }

  handleDelete(ev, campus, id) {
    ev.preventDefault();
    this.props.deleteCampus(campus);
    console.log('HANDLE DELETE TEST',id)
    this.props.updateMultiple(id)
  }
  

  render() {
    const {students, campuses} = this.props
    const {name, imageUrl, address, description} = this.state
    const {handleSubmit, handleChange, handleDelete} = this
    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name='name' value={name} onChange={handleChange} placeholder='Campus Name' />
          <input name='imageUrl' value={imageUrl} onChange={handleChange} placeholder='Upload an image of campus' />
          <input name='address' value={address} onChange={handleChange} placeholder='Campus Address' />
          <textarea name='description' value={description} onChange={handleChange} placeholder='Describe the campus' />
          <button type='submit'>Register your new campus!</button>
        </form>
      </div>
      <div>
        <ul>
          {campuses.map(campus => {
            const enrolledStudents = students.filter(student => student.campusId === campus.id);
            return (
            <li key={campus.id}>
              <Link to={`campuses/${campus.id}`} >{campus.name} ({enrolledStudents.length} Enrolled Students) </Link>
              <div>
                <img src={campus.imageUrl} />{campus.address}
              </div>
              <button onClick={(ev) => handleDelete(ev, campus, campus.id)}>Sell This Campus</button>
            </li>
                    
            )
          })}
        </ul>
      </div>
    </div>
    

  )
  }

}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus, history)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus)),
    updateMultiple: (id) => dispatch(updateMultiple(id))
  }
}


export default connect(state=>state, mapDispatchToProps)(Campuses)