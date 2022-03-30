import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateStudent, loadStudents} from '../store/studentStore';
import {Card, Form, Container, Button, Row, Col, FloatingLabel} from 'react-bootstrap';


class Student extends React.Component{
  constructor(props) {
    super(props),
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      email: this.props.student ? this.props.student.email : '',
      imageUrl: this.props.student ? this.props.student.imageUrl : '',
      gpa: this.props.student ? this.props.student.gpa : '',
      campusId: this.props.student ? this.props.student.campusId*1 : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this)
  };

  handleChange(ev){
    ev.target.setCustomValidity('');
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

  handleSelect(ev){
    ev.target.setCustomValidity('');
    this.setState({
      [ev.target.name]:ev.target.value*1
    })
  };

  handleSubmit(ev){
    ev.preventDefault();
    const updatedStudent = {...this.props.student, ...this.state}
    this.props.updateStudent(updatedStudent);
    alert(`${this.state.firstName} ${this.state.lastName} has been updated!`)
  }

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
    if(!prevProps.student && this.props.student || prevProps.student.id !== this.props.student.id ){
      this.setState({
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        gpa: this.props.student.gpa,
        campusId: this.props.student.campusId*1
      })
    }
  }

  render(){
    const {student, campuses, students} = this.props;
    const studentIds = students.map(student => student.id)
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleSubmit, handleGPAChange, handleChange, handleSelect} = this;
    const campus = student ? campuses.find(campus => campus.id === student.campusId) : null
    if(!studentIds.includes(this.props.match.params.id*1)) {
      return (
      <div>
        <h2>Oops! It looks like that student doesn't exist in our database.</h2>
        <h2>Click <Link to='/students'>here</Link> to go back to the student list.</h2>
      </div> 
    ) 
    }
    return(
      <div style={{display:'flex', marginTop:'2rem', alignItems:'center'}} key={student.id}>
        <Container className='studentCard' style={{flexBasis:'55%', backgroundColor:'white'}}>
            <Card style={{border:'none', flexDirection:'row', alignItems:'center'}}>
                <Card.Img style={{padding:'1rem', flexBasis:'30%', maxHeight:'30vh'}} src={student.imageUrl} />
                <Card style={{border:'none', textAlign:'center', flexBasis:'70%'}}>
                  <Card.Body>
                    <Card.Title>{student.firstName} {student.lastName}</Card.Title>
                    {!campus ? <Card.Subtitle style={{paddingTop:'.5rem'}}>Not Currently Enrolled</Card.Subtitle> : <Card.Subtitle style={{paddingTop:'.5rem'}}>Student at <Link to={`/campuses/${campus.id}`} style={{textDecoration:'none', color:'inherit'}}>{campus.name}</Link></Card.Subtitle>}
                    <Card.Subtitle style={{padding:'1rem'}}>Email: {student.email}</Card.Subtitle>
                    <Card.Subtitle>Current GPA: {student.gpa}</Card.Subtitle>
                  </Card.Body>
                </Card>         
              </Card>
        </Container>
        <Form onSubmit={handleSubmit} style={{flexBasis:'40%', textAlign:'center', marginRight:'3rem'}}>
          <Form.Label style={{fontSize:'20px'}}>Update Student Details</Form.Label>
          <Form.Group>
            <Row>
              <Col>
                <FloatingLabel label="First Name" className="mb-3" >
                  <Form.Control name='firstName' value={firstName} placeholder='First Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a first name')}/>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="Last Name" className="mb-3" >
                  <Form.Control name='lastName' value={lastName} placeholder='Last  Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a last name')}/>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel label="Email Address" className="mb-3" >
              <Form.Control type='email' name='email' value={email} placeholder='Enter your email' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a valid email address')}/>
            </FloatingLabel>
            <FloatingLabel label="Image URL" className="mb-3" >
              <Form.Control type='url' name='imageUrl' value={imageUrl} placeholder='Link your picture here' onChange={handleChange} />
            </FloatingLabel>
            <FloatingLabel label="GPA" className="mb-3" >
              <Form.Control name='gpa' type='number' value={gpa ? gpa : ''} placeholder='Enter your GPA' max='4' onChange={handleGPAChange} />
            </FloatingLabel>
            <FloatingLabel label="Campus" className="mb-3" >
              <Form.Select name='campusId' required onInvalid={e => e.target.setCustomValidity('Please select a campus')} value={campusId ? campusId : ''} onChange={handleSelect}>
                <option value=''>-- Select a Campus --</option>
                {campuses.map(campus => {
                  return (
                    <option value={campus.id*1} key={campus.id}>{campus.name}</option>
                  )
                })}
              </Form.Select>
            </FloatingLabel>
            <Button type='submit' style={{marginTop:'.5rem'}}>Update</Button>
          </Form.Group>

        </Form>
      </div>



    )
  }
};

const mapStateToProps = ({students, campuses}, {match}) => {
  const student = students.find(student => student.id === match.params.id*1)
  return {
    student,
    campuses,
    students
  }
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    deleteStudent: (student) => dispatch(deleteStudent(student)),
    updateStudent: (student) => dispatch(updateStudent(student, history)),
    loadStudents: () => dispatch(loadStudents())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);