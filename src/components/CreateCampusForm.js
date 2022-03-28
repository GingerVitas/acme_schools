import React from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../store/campusStore';

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
    this.props.createCampus({...this.state});
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
      <form onSubmit={handleSubmit}>
          <input name='name' value={name} onChange={handleChange} placeholder='Campus Name' required onInvalid={e => e.target.setCustomValidity('Please enter a name for the campus')}/>
          <input name='imageUrl' value={imageUrl} onChange={handleChange} placeholder='Upload an image of campus' />
          <input name='address' value={address} onChange={handleChange} placeholder='Campus Address' required onInvalid={e => e.target.setCustomValidity('Please enter a valid address for the campus')}/>
          <textarea name='description' value={description} onChange={handleChange} placeholder='Describe the campus' />
          <button type='submit'>Register your new campus!</button>
      </form>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    createCampus: (campus) => dispatch(createCampus(campus))
  }
}

export default connect(null, mapDispatchToProps)(CreateCampusForm)