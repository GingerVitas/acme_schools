import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
  constructor(props){
    super(props)
    this.redirectTimout = null
  }

  componentDidMount(){
    const {history} = this.props
    this.redirectTimeout = setTimeout(() => {
      history.push('/') }, 4000)
    }


  componentWillUnmount() {
    clearTimeout(this.redirectTimeout);
  }

  render(){
    return(
      <div>
        <h1>Oops!</h1>
        <h2>It looks like that page doesn't exist yet.</h2>
        <h3>We'll take you back to the homepage in a few seconds, or you can click <Link to='/'>here</Link> to go back now!</h3>
      </div>
    )
  }

}

export default NotFound