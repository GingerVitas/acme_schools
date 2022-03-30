import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStudent} from '../store/studentStore';
import {Form, Button, Row, Col, Container, FloatingLabel} from 'react-bootstrap';

class CreateStudentForm extends Component {
  constructor(props) {
    super(props),
    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGPAChange = this.handleGPAChange.bind(this);
  }

  handleChange(ev) {
    ev.target.setCustomValidity('');
    this.setState({
      [ev.target.name]:ev.target.value
    })
  };

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

  handleSubmit(ev){
    ev.preventDefault();
    if(this.state.imageUrl === '') {
      const newStudent = Object.fromEntries(Object.entries({...this.state}).filter(([key, value]) => key !== 'imageUrl'));
      console.log(newStudent)
      this.props.addStudent(newStudent);
      alert(`${this.state.firstName} ${this.state.lastName} has been enrolled!`)
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '',
        campusId: ''
      })
    } else {
      const newStudent = {...this.state}
      this.props.addStudent(newStudent);
      alert(`${this.state.firstName} ${this.state.lastName} has been enrolled!`)
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '',
        campusId: ''
      })
    }
  }

  render(){
    const {campuses} = this.props
    const {firstName, lastName, email, imageUrl, gpa, campusId} = this.state;
    const {handleChange, handleGPAChange, handleSubmit} = this;

    if(!campuses.length) return <h3>Loading....</h3>;
    return(
      <Container style={{marginBottom:'1rem'}}>
        <Form onSubmit={handleSubmit}>
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
              <Col>
                <FloatingLabel label="Email Address" className="mb-3" >
                  <Form.Control type='email' name='email' value={email} placeholder='Enter your email' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a valid email address')}/>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel label="Image URL" className="mb-3" >
                  <Form.Control type='url' name='imageUrl' value={imageUrl} placeholder='Link your picture here' onChange={handleChange} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="GPA" className="mb-3" >
                  <Form.Control name='gpa' type='number' value={gpa ? gpa : ''} placeholder='Enter your GPA' max='4' onChange={handleGPAChange} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="Campus" className="mb-3" >
                  <Form.Select name='campusId' value={campusId} required onInvalid={e => e.target.setCustomValidity('Please select a campus')} onChange={handleChange}>
                    <option value=''>-- Select a Campus --</option>
                    {campuses.map(campus => {
                      return (
                        <option value={campus.id} key={campus.id}>{campus.name}</option>
                      )
                    })}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group> 
        <Button type='submit' style={{marginTop:'.5rem'}}>Register!</Button>
      </Form>
      </Container> 
    )
  }


}

const mapDispatchToProps = dispatch => {
  return {
    addStudent: (student) => dispatch(addStudent(student))
  }
}

export default connect(state => state, mapDispatchToProps)(CreateStudentForm)