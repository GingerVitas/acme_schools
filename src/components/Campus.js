import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {updateCampus, loadCampuses} from '../store/campusStore';
import EnrolledStudentCard from './EnrolledStudentCard';
import {Card, Container, Form, Button, Row, FloatingLabel} from 'react-bootstrap';



class Campus extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: this.props.campus ? this.props.campus.name : '',
      imageUrl: this.props.campus ? this.props.campus.imageUrl : '',
      address: this.props.campus ? this.props.campus.address : '',
      description: this.props.campus ? this.props.campus.description : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(){
    await this.props.loadCampuses();
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.updateCampus({...this.props.campus, ...this.state})
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  componentDidUpdate(prevProps){
    if(!prevProps.campus && this.props.campus){
      this.setState({
        name: this.props.campus.name,
        imageUrl: this.props.campus.imageUrl,
        address: this.props.campus.address,
        description: this.props.campus.description
      })
    }
  };


  render(){
    const {name, imageUrl, address, description} = this.state
    const {campus, campuses, students} = this.props
    const enrolledStudents = campus ? students.filter(student => student.campusId === campus.id) : null;
    const campusIds = campuses.map(campus => campus.id)
    const {handleChange, handleSubmit} = this
    if(!campusIds.includes(this.props.match.params.id*1)) return (
      <div>
        <h2>Oops! It looks like we don't manage that campus yet.</h2>
        <h2>Click <Link to='/campuses'>here</Link> to go back to the campus list.</h2>
      </div> 
    ) 
    if(!campus) return <h2>Loading....</h2>
    return(
      <div>
        <Container fluid>
          <Card style={{flexDirection:'row', justifyContent:'center', textAlign:'center', flexWrap:'wrap', alignItems:'center'}}>
            <Card.Img style={{flexBasis:'45%', padding:'1rem', objectFit:'cover'}} src={campus.imageUrl} />
            <Form style={{flexBasis:'45%'}} onSubmit={handleSubmit}>
              <Form.Label>Update Campus Details</Form.Label>
              <Form.Group>
                <FloatingLabel label='name' className='mb-3'>
                  <Form.Control name='name' value={name} onChange={handleChange} placeholder='Name' />
                </FloatingLabel>
                  <FloatingLabel label='Image URL' className='mb-3'>
                <Form.Control name='imageUrl' value={imageUrl} onChange={handleChange} placeholder='Image URL' />
                </FloatingLabel>
                <FloatingLabel label='Address' className='mb-3'>
                  <Form.Control name='address' value={address} onChange={handleChange} placeholder='Address' />
                </FloatingLabel>
                <FloatingLabel label='Description' className='mb-3'>
                 <Form.Control as='textarea' height={'100px'} name='description' value={description} onChange={handleChange} placeholder='Description' />
                </FloatingLabel>
                <Button style={{marginTop:'1rem'}} type='submit'>Update Campus</Button>
              </Form.Group>
            </Form>
            <Card.Body>
              <Card.Title style={{flexBasis:'100%'}}>{campus.name}</Card.Title>
              <Card.Subtitle style={{flexBasis:'100%', padding:'1rem'}}>{campus.address}</Card.Subtitle>
              <Card.Text style={{flexBasis:'100%'}}>{campus.description}</Card.Text>
            </Card.Body> 
          </Card>
        </Container>
        <div style={{textAlign:'center', marginTop:'1rem'}}>
          <h3>Enrolled Students</h3>
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2} style={{alignText:'center', margin:'1rem'}}>
            <EnrolledStudentCard students={enrolledStudents} campus={campus} style={{margin:'1rem'}} />
          </Row>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = ({students, campuses}, {match}) => {
  const campus = campuses.find(campus => campus.id === match.params.id*1);
  return {
    campus,
    campuses,
    students
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    loadCampuses: () => dispatch(loadCampuses()),
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    updateStudent: (student) => dispatch(updateStudent(student, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)