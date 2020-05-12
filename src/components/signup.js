import React from 'react';
import axios from 'axios';
//import { Router, Link }  from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            age:"",
            password: "",
            confirmPassword: ""
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

        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/auth/signup/', {
            firstName : this.state.firstName,
            lastName: this.state.lastName,
            username:this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            age: this.state.age,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        })
        .then(res =>{
            console.log("New user created")
            if(res){
                this.props.history.push('/signin')
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
                    <a className="navbar-brand" href="#"><h2>15c-Tech</h2></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                        <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/covido">Covid-19</a>
                        <a className="nav-item nav-link" href="/signin" >Login</a>
                        </div>
                    </div>
                </nav>
                <h2>Signup</h2>
                <br />
                <p> Get fast and reliable medical attention when you sign up</p>
                <div className= "card boxer">
                <form onSubmit={this.handleSubmit}>  
                    <div className=".row">
                    <div className="col">
                    <label htmlFor="firstName" className=".col-form-label">FirstName</label>
                        <input type="text" className="form-control log" name= "firstName" placeholder="First name" value={this.state.firstName} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="lastName" className=".col-form-label">LastName</label>
                        <input type="text" className="form-control log" name= "lastName" placeholder="Last name" value={this.state.lastName} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="username" className=".col-form-label">username</label>
                        <input type="text" className="form-control log" name= "username" placeholder="username"  value={this.state.username} onChange= {this.handleChange}/>
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
                    <label htmlFor="age" className=".col-form-label">Age</label>
                        <input type="number" className="form-control log" name= "age" placeholder="Age" value={this.state.age} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="password" className=".col-form-label">Password</label>
                        <input type="password" className="form-control log" name= "password" placeholder="Password" value={this.state.password} onChange= {this.handleChange}/>
                    </div>
                    <div className="col">
                    <label htmlFor="confirmPassword" className=".col-form-label">Confirm Password</label>
                        <input type="password" className="form-control log" name= "confirmPassword" placeholder="Confirm Password"  value={this.state.confirmPassword} onChange= {this.handleChange}/>
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
