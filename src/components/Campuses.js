import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCampus} from '../store/campusStore';

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
  }
  
  handleSubmit(ev){
    ev.preventDefault();
    this.props.createCampus({...this.state})
  }

  handleChange(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }
  

  render() {
    const {students, campuses} = this.props
    const {name, imageUrl, address, description} = this.state
    const {handleSubmit, handleChange} = this
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
            <Link to={`campuses/${campus.id}`} key={campus.id}><li>
              {campus.name} ({enrolledStudents.length} Enrolled Students)
              <div>
                <img src={campus.imageUrl} />{campus.address}
              </div>
            </li></Link>
                    
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
    createCampus: (campus) => dispatch(createCampus(campus, history))
  }
}


export default connect(state=>state, mapDispatchToProps)(Campuses)