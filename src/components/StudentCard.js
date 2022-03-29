import React from 'react';
import {connect} from 'react-redux';
import {deleteStudent, loadStudents} from '../store/studentStore';
import {Link} from 'react-router-dom';
import {Card, Col, Button, Container} from 'react-bootstrap';
import './customStyles.css'

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
          <div key={student.id} >
            <Container className='studentCard'>
              <Col style={{display:'flex', justifyContent:'center'}}>
                <Card style={{border:'none', flexDirection:'row', minWidth:'485px', maxWidth:'485px', minHeight:'135px', maxHeight:'135px'}}>
                  <Link to={`/students/${student.id}`} style={{textDecoration:'none'}}><Card.Img src={student.imageUrl} /></Link>
                  <Card style={{border:'none', minWidth:'365px', maxWidth:'365px', minHeight:'135px', maxHeight:'135px', textAlign:'center'}}>
                    <Card.Body>
                      <Card.Title><Link to={`/students/${student.id}`} style={{textDecoration:'none', color:'inherit'}}>{student.firstName} {student.lastName}</Link></Card.Title>
                      {!campus ? <Card.Subtitle style={{paddingTop:'.5rem'}}>Not Currently Enrolled</Card.Subtitle> : <Card.Subtitle style={{paddingTop:'.5rem'}}>Student at <Link to={`/campuses/${campus.id}`} style={{textDecoration:'none', color:'inherit'}}>{campus.name}</Link></Card.Subtitle>}
                      <Card.Subtitle style={{padding:'.5rem'}}>Email: {student.email}</Card.Subtitle>
                      <Card.Subtitle>GPA: {student.gpa}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Card>
              </Col>
              <Button variant="primary" style={{marginTop:'.5em'}} size="lg" onClick={()=> deleteFunction(student)}>
                      Remove from Database
              </Button>
            </Container>
          </div>
          
          
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