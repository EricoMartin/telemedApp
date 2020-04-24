import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import imageUrl from '../img/hospital.jpg';
//import signupUsers from './signup';



export default class CoverPage extends React.Component{
    render(){

    
    return (
        <div className="welcome-section  text-center" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover',
        backgroundPosition: 'center center'}}>
          
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ">
            <main role="main"  className="inner cover">
        <h1 className="cover-heading" >Welcome to TeleMed App </h1>
        <p className="lead">Your one-stop HealthCare App at your finger tips. Available on all devices, quick medical response and consultations</p>
        <p className="lead">
          <Router>
          <button className="btn btn-lg btn-light" onClick={()=> {this.props.history.replace('/select')}}>
            Get Started</button>
          
          </Router>
          
        </p>
        <br/>
          Already registered? click<Link to="/signin"> here </Link>to signin
      </main>
      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>Developed by Martini&reg; for Dee's ICT Consult 2020</p>
        </div>
      </footer>
        </div>
        </div>
      );
    }
}