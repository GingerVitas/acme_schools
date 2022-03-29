import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStudent} from '../store/studentStore';
import {Form, Button, Row, Col, Container} from 'react-bootstrap';

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
                <Form.Control name='firstName' value={firstName} placeholder='First Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a first name')}/>
              </Col>
              <Col>
                <Form.Control name='lastName' value={lastName} placeholder='Last  Name' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a last name')}/>
              </Col>
              <Col>
                <Form.Control type='email' name='email' value={email} placeholder='Enter your email' onChange={handleChange} required onInvalid={e => e.target.setCustomValidity('Please enter a valid email address')}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control type='url' name='imageUrl' value={imageUrl} placeholder='Upload a picture' onChange={handleChange} />
              </Col>
              <Col>
                <Form.Control name='gpa' type='number' value={gpa ? gpa : ''} placeholder='Enter your GPA' max='4' onChange={handleGPAChange} />
              </Col>
              <Col>
                <Form.Select name='campusId' value={campusId} onChange={handleChange}>
                  <option value=''>-- Select a Campus --</option>
                  {campuses.map(campus => {
                    return (
                      <option value={campus.id} key={campus.id}>{campus.name}</option>
                    )
                  })}
                </Form.Select>
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