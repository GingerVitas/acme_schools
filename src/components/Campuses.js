import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Campuses extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      address: '',
      description: '',
    }
  }
  
  handleSubmit(ev){
    ev.preventDefault();
    this.props.createCampus({...this.state})
  }
  

  render() {
    const {students, campuses} = this.props

    if(!students.length || !campuses.length) return <h3>Loading...</h3>;
    return(
    <div>
      <div>

      </div>
      <div>
        <ul>
          {campuses.map(campus => {
            const enrolledStudents = students.filter(student => student.campusId === campus.id);
            return (
            <Link to={`campuses/${campus.id}`} key={campus.id}><li>
              {campus.name} ({enrolledStudents.length} enrollments)
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



export default connect(state=>state)(Campuses)