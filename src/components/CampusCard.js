import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteCampus} from '../store/campusStore';
import {updateMultiple} from '../store/studentStore';
import {Card, Col, Button, Container} from 'react-bootstrap';
import './customStyles.css'

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
        campuses.map(campus => {
          const enrolledStudents = students.filter(student => student.campusId === campus.id);
          return (
            <div key={campus.id}>
              <Container>
                <Col>
                  <Card className='campusCard'>
                    <Link to={`/campuses/${campus.id}`}><img className='campusCardImg' src={campus.imageUrl} /></Link>
                    <Card.Body>
                      <Card.Title>
                        {campus.name}
                      </Card.Title>
                      <Card.Subtitle style={{padding:'.5rem'}}>
                        {!enrolledStudents.length ? 'No Students Enrolled' : enrolledStudents.length === 1 ? 'Enrollement: 1 Student' : `Enrollment: ${enrolledStudents.length} Students`}
                      </Card.Subtitle>
                      <Card.Subtitle style={{padding:'.5rem'}}>Located at: {campus.address}</Card.Subtitle>
                      <Button variant='primary' size='lg' onClick={(ev)=> handleDelete(ev, campus)}>Sell this Campus</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Container>
            </div>
          )
        })
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