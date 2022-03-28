import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteCampus} from '../store/campusStore';
import {updateMultiple} from '../store/studentStore';

class CampusCard extends React.Component {
  constructor(props) {
    super(props),

    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleDelete(ev, campus) {
    ev.preventDefault();
    await this.props.updateMultiple(campus)
    await this.props.deleteCampus(campus);
  }

  render() {
    const {campuses, students} = this.props;
    const {handleDelete} = this;

    return(
      <tbody>
        {campuses.map(campus => {
          const enrolledStudents = students.filter(student => student.campusId === campus.id);
          return (
            <tr key={campus.id}>
              <td>
                <Link to={`/campuses/${campus.id}`}><img className='campusCardImg' src={campus.imageUrl} /></Link>
                <div className='campusCardName'>{campus.name}</div>
                <div className='campusCardEnrollees'>{enrolledStudents.length} Enrolled Students</div>
                <div className='campusCardAddress'>Located at {campus.address}</div>
                <div className='campusCardButton'><button onClick={(ev)=> handleDelete(ev, campus)}>Sell This Campus</button></div>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

}


const mapDispatchToProps = dispatch => {
  return {
    deleteCampus: (campus) => dispatch(deleteCampus(campus)),
    updateMultiple: (id) => dispatch(updateMultiple(id))
  }
};

export default connect(null, mapDispatchToProps)(CampusCard)