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
            services: ""
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
        const form = new FormData();
        form.append("name", this.state.name )
        form.append("services", this.state.services )
        form.append("address", this.state.address )
        form.append("email", this.state.email )
        form.append("phone", this.state.phone )
        form.append("website", this.state.website )
        form.append("workingHours", this.state.workingHours )
        form.append("regFee", this.state.regFee )
        form.append("regNumber", this.state.regNumber )
        form.append("specialization", this.state.specialization )

        axios.post('http://localhost:5000/api/v1/hosp/signup', form)
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
                <p> Get fast and reliable medical attention when you sign up</p>
                <form onSubmit={this.handleSubmit}>  
                    <div className=".row">
                    <div className="col">
                    <label htmlFor="name" className=".col-form-label">Hospital Name</label>
                        <input type="text" className="form-control log" name= "name" placeholder="Hosital Name" value={this.state.name} onChange= {this.handleChange}/>
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
                    
                    <br/><br/>
                    <div className="col container">
                        <input type="submit" className="form-control btn btn-lg btn-light" placeholder="Sign up"/>
                    </div>
                    
                    </div>
                    
                </form>
            </div>
        )
    }
}
