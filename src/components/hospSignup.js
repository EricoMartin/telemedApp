import React from 'react';
import axios from 'axios';
//import { Router, Link }  from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            website: "",
            name: "",
            address: "",
            workingHours: "",
            email: "",
            phone: "",
            regFee: "",
            regNumber: "",
            specialization: "",
            services: "",
            ambulances: ""
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
        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/hosp/signup', {
            name: this.state.name,
            services: this.state.services,
            address: this.state.address,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            email: this.state.email,
            phone: this.state.phone,
            website: this.state.website,
            workingHours: this.state.workingHours,
            regFee: this.state.regFee,
            regNumber: this.state.regNumber,
            specialization: this.state.specialization,
            ambulances: this.state.ambulances
        })
        .then(res =>{
            console.log("New Hospital created")
            if(res){
                this.props.history.push('/hosplogin')
            }
        })
        .catch( err =>{
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
                        <a className="nav-item nav-link" href="/hosplogin" >Login</a>
                        </div>
                    </div>
                </nav>
                <h2>Signup</h2>
                <br />
                <h5> Provide fast and reliable medical services when you sign up</h5>
                <div className= "card boxer">
                <form onSubmit={this.handleSubmit}>  
                    <div className=".row">
                    <div className="col">
                    <label htmlFor="name" className=".col-form-label">Hospital Name</label>
                        <input type="text" className="form-control log" name= "name" placeholder="Hosital Name" value={this.state.name} onChange= {this.handleChange}/>
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
                    <label htmlFor="website" className=".col-form-label">website</label>
                        <input type="text" className="form-control log" name= "website" placeholder="www.hospital.com" value={this.state.website} onChange= {this.handleChange}/>
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
                    <label htmlFor="address" className=".col-form-label">Address</label>
                        <input type="text" className="form-control log" name= "address" placeholder="address" value={this.state.address}  onChange= {this.handleChange}/>
                    </div>
                   
                    <div className="col">
                    <label htmlFor="workingHours" className=".col-form-label">Opening Hours</label>
                        <input type="text" className="form-control log" name= "workingHours" placeholder="9am - 4pm"  value={this.state.workingHours} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="regFee" className=".col-form-label">Registration Fee</label>
                        <input type="number" className="form-control log" name= "regFee"  value={this.state.regFee} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="regNumber" className=".col-form-label"> Registration Number</label>
                        <input type="number" className="form-control log" name= "regNumber"  value={this.state.regNumber} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="specialization" className=".col-form-label">Medical Specialization</label>
                        <input type="text" className="form-control log" name= "specialization"  value={this.state.specialization} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="services" className=".col-form-label">Medical Services</label>
                        <input type="text" className="form-control log" name= "services"  value={this.state.services} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="services" className=".col-form-label">Ambulances</label>
                        <input type="number" className="form-control log" name= "ambulances"  value={this.state.ambulances} onChange= {this.handleChange}/>
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
