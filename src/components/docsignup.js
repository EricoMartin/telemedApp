import React from 'react';
import axios from 'axios';
//import { Router, Link }  from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            firstName: "",
            lastName: "",
            hospital: "",
            hospitalAddress: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            consultFee: "",
            regID: "",
            specialization: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    
    handleChange = (evt) =>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };
    handleSubmit = (event) =>{
        event.preventDefault()

        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/auth/doc/signup/', {
            firstName : this.state.firstName ,
            lastName: this.state.lastName,
            hospital: this.state.hospital,
            hospitalAddress:this.state.hospitalAddress,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            consultFee: this.state.consultFee,
            regID: this.state.regID,
            specialization: this.state.specialization,
        })
        .then(res =>{
            console.log("New Doctor created")
            if(res){
                this.props.history.push('/doclogin')
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
    render() {
        return(
            <div className='container text-center'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light container">
                    <a className="navbar-brand" href="#"><h2>Telemed</h2></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                        <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/select">Services</a>
                        <a className="nav-item nav-link" href="/blog">Blog</a>
                        <a className="nav-item nav-link" href="/covido">Covid-19</a>
                        <a className="nav-item nav-link" href="/doclogin" >Login</a>
                        </div>
                    </div>
                </nav>
                <h2>Signup</h2>
                <br />
                <p> Provide fast, reliable medical services and make money when you sign up</p>
                <div className= "card boxer">
                <form onSubmit={this.handleSubmit}>  
                    <div className=".row">
                    <div className="col">
                    <label htmlFor="name" className=".col-form-label">First Name</label>
                        <input type="text" className="form-control log" name= "firstName" placeholder="First Name" value={this.state.firstName} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="name" className=".col-form-label">Last Name</label>
                        <input type="text" className="form-control log" name= "lastName" placeholder="Last Name" value={this.state.lastName} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="hospital" className=".col-form-label">Hospital</label>
                        <input type="text" className="form-control log" name= "hospital" placeholder="hospital" value={this.state.hospital} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="hospitalAddress" className=".col-form-label">Hospital Address </label>
                        <input type="text" className="form-control log" name= "hospitalAddress" placeholder="Hospital Address"  value={this.state.hospitalAddress} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="email" className=".col-form-label">Email</label>
                        <input type="text" className="form-control log" name= "email" placeholder="Email" value={this.state.email} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="phone" className=".col-form-label">Phone</label>
                        <input type="number" className="form-control log" name= "phone" placeholder="08035609698" value={this.state.phone}  onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="password" className=".col-form-label">Password</label>
                        <input type="password" className="form-control log" name= "password" placeholder="Password" value={this.state.password} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="confirmPassword" className=".col-form-label">Confirm Password</label>
                        <input type="password" className="form-control log" name= "confirmPassword" placeholder="Confirm Password"  value={this.state.confirmPassword} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="consultFee" className=".col-form-label">Consultation Fee</label>
                        <input type="number" className="form-control log" name= "consultFee"  value={this.state.consultFee} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="regID" className=".col-form-label">Medical Registration ID</label>
                        <input type="number" className="form-control log" name= "regID"  value={this.state.regID} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="specialization" className=".col-form-label">Medical Specialization</label>
                        <input type="text" className="form-control log" name= "specialization"  value={this.state.specialization} onChange= {this.handleChange}/>
                    </div>

                    <br/><br/>
                    <div className="col container">
                        <input type="submit" className="form-control btn btn-lg btn-dark" placeholder="Sign up"/>
                    </div>
                    
                    </div>
                    
                </form>
                </div>
            </div>
        )
    }
}
