import React from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../store/campusStore';
import {Form, Button, FloatingLabel} from 'react-bootstrap';

class CreateCampusForm extends React.Component {
  constructor(props){
    super(props),
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
    if(this.state.imageUrl === '') {
      const newCampus = Object.fromEntries(Object.entries({...this.state}).filter(([key, value]) => key !== 'imageUrl'));
      this.props.createCampus(newCampus);
      alert(`${this.state.name} has been created!`)
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '',
        campusId: ''
      })
    } else {
      const newCampus = {...this.state}
      this.props.addStudent(newCampus);
      alert(`${this.state.name} has been created!`)
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

  handleChange(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }

  render(){
    const {name, imageUrl, address, description} = this.state
    const {handleSubmit, handleChange} = this

    return(
      <Form onSubmit={handleSubmit} style={{position:'fixed', width:'40%', right:'1vw', top:'30vh'}}>
        <Form.Label style={{fontSize:'25px'}}>Create a new Campus!</Form.Label>
        <Form.Group>
         <FloatingLabel label='Name' className='mb-3'>
            <Form.Control name='name' value={name} onChange={handleChange} placeholder='Campus Name' required onInvalid={e => e.target.setCustomValidity('Please enter a name for the campus')}/>
          </FloatingLabel>
          <FloatingLabel label='Image URL' className='mb-3'>
            <Form.Control name='imageUrl' type='url' value={imageUrl} onChange={handleChange} placeholder='Image URL' />
          </FloatingLabel>
          <FloatingLabel label='Address' className='mb-3'>
            <Form.Control name='address' value={address} onChange={handleChange} placeholder='Campus Address' required onInvalid={e => e.target.setCustomValidity('Please enter a valid address for the campus')}/>
          </FloatingLabel>
          <FloatingLabel label='Description' className='mb-3'>
            <Form.Control as='textarea' style={{height: '200px'}} name='description' value={description} onChange={handleChange} placeholder='Description' />
          </FloatingLabel>
          <br></br>
          <Button type='submit'>Register your new campus!</Button>
        </Form.Group>
      </Form>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus))
  }
}

export default connect(null, mapDispatchToProps)(CreateCampusForm)