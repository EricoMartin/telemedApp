import React from 'react';
import axios from 'axios';

import Facebook from './fbLogin';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password:"",
            regNumber: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange= evt =>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    handleSubmit= evt =>{
        evt.preventDefault()
        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/hosp/signin', {
            email: this.state.email,
            password: this.state.password,
            regNumber: this.state.regNumber
        })
        .then(res =>{
            
            if(res){
                JSON.parse(JSON.stringify(res))
                console.log(res)
                const token = res.data.token
                localStorage.setItem('master-token', token)
                
                return res.data
            }})
            .then(result => {
                if(result){
                    this.props.history.push('/hosp')
                }
            })
       
        .catch( err =>{
            console.log(err)        
        })
    }
    
    
    render(){
        return (
            <div className='container text-center'>
                <br/>
            <h2>Login</h2>
            <br/>
            <div className= "card boxarea">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control log" 
                name="email" id="email" aria-describedby="emailHelp" 
                placeholder="Email/ Username"value={this.state.email} onChange={ this.handleChange}/>
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control log" name ="password" placeholder="Password" value={this.state.password} onChange={ this.handleChange}/>
            </div>
            <div className="form-group">
            <label htmlFor="regNumber">Registration Number</label>
            <input type="number" className="form-control log" 
                name="regNumber" id="regNumber" aria-describedby="regNumber" 
                placeholder="Registration Number"value={this.state.regNumber} onChange={ this.handleChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your details with anyone else.</small>
            </div>
            <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="check"/>
            <label className="frmcheck-label" htmlFor="check">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <br/>
            
        </form>
            <p>Or Login with Facebook</p>
                  <div className="fbdiv"><Facebook/></div> 
                  </div>     
        </div>
        );
}}