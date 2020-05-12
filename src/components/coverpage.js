import React, { Fragment } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { MDBBtn, MDBIcon } from "mdbreact";
import imageUrl from '../img/hospital.jpg';
import img from '../img/logo.jpeg';



export default class CoverPage extends React.Component{
    render(){

    
    return (
        <div className="welcome-section  text-center" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover',
        backgroundPosition: 'center center'}}>
          
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ">
            <main role="main"  className="inner cover">
        <img style={{border: '0px', backgroundColor: 'white'}} src= {img} alt="logo"/><div className="lead">
        <br/>
          <Router>
          <button className="btn btn-lg btn-light" style={{width: '150px'}} onClick={()=> {this.props.history.replace('/signin')}}>
            Login</button>

            <br/>
            <br/>
            <br/>
            <button className="btn btn-lg btn-light" style={{width: '150px'}} onClick={()=> {this.props.history.replace('/signup')}}>
            Signup</button>
            <br/>
            <br/>
            <br/>
                    
          
          </Router>
          
        </div>
        <br/>
          Already registered? click<Link to="/select"> here </Link>to signin
      </main>
      <footer className="mastfoot mt-auto">
      <button class="btn btn-danger btn-rounded" style={{width: '150px'}} type="button" role="button">Emergency</button>
        <div className="inner">
          Only click in the case of an Emergency
          <p> 15C TECH 2020</p>
        </div>
      </footer>
        </div>
        </div>
      );
    }
}