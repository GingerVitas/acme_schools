import React from 'react';
import {connect} from 'react-redux';
import {deleteStudent, loadStudents} from '../store/studentStore';
import {Link} from 'react-router-dom';
import {Card, Col, Button} from 'react-bootstrap';

class StudentCard extends React.Component {
  constructor(props){
    super(props),

    this.deleteFunction = this.deleteFunction.bind(this)
  }

deleteFunction(student){
    this.props.deleteStudent(student).then(() => {
        return alert('Student removed from database!')
      }
    )
  }
  // <Link to={`/students/${student.id}`}></Link>
  render(){
    const {students, campuses} = this.props
    const {deleteFunction} = this;
    if(!students.length) return (<tr><td>No matching students</td></tr>)
    return(
      students.map(student => {
        const campus = campuses.find(campus => campus.id === student.campusId);
        return (
          <Col key={student.id}>
            <Card style={{maxWidth:'300px'}}>
            <Link to={`/students/${student.id}`}><Card.Img src={student.imageUrl} /></Link>
              <Card.Body>
                <Card.Title>{student.firstName} {student.lastName}</Card.Title>
                {!campus ? <Card.Subtitle>Not Currently Enrolled</Card.Subtitle> : <Link to={`/campuses/${campus.id}`}><Card.Subtitle>Student at {campus.name}</Card.Subtitle></Link>}
                <Card.Subtitle>Email: {student.email}</Card.Subtitle>
                <Card.Subtitle>GPA: {student.gpa}</Card.Subtitle>
              </Card.Body>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={()=> deleteFunction(student)}>
                  Remove from Database
                </Button>
              </div>
            </Card>
          </Col>
        )
      })
    )
  }
  

}
const mapDispatchToProps = (dispatch) => {
  return {
    loadStudents: () => dispatch(loadStudents()),
    deleteStudent: (student) => dispatch(deleteStudent(student))
  }
};

export default connect(null, mapDispatchToProps)(StudentCard);