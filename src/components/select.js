import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import imageUrl from '../img/hospital.jpg';
//import signupUsers from './signup';



export default class SelectPage extends React.Component{

    render(){

    
    return (
        <div className="welcome-section  text-center" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover',
        backgroundPosition: 'center center'}}>
          
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column ">
            <main role="main"  className="inner cover">
        <h1 className="cover-heading" >Welcome to TeleMed App </h1>
        <p className="lead">Click button to select</p>
        <p className="lead">
          <Router>
          <button className="btn btn-lg btn-light" onClick={()=> {this.props.history.replace('/covido')}}>
            Covid-19</button> <br/><br/>

            <button className="btn btn-lg btn-light" onClick={()=> {this.props.history.replace('/signup')}}>
            Users</button><br/><br/>

            <button className="btn btn-lg btn-light" onClick={()=> {this.props.history.replace('/docsignup')}}>
            Doctors</button><br/><br/>

            <button className="btn btn-lg btn-light" onClick={()=> {this.props.history.replace('/hospsignup')}}>
            Hospitals</button><br/>
          
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