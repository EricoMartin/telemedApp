import React from 'react';
import axios from 'axios';

import Facebook from './fbLogin';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: "",
            password: "",
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
        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/auth/signin', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res =>{
            
            if(res){
                JSON.parse(JSON.stringify(res))
                const token = res.data.token
                localStorage.setItem('master-token', token)
                
                return res.data
            }})
            .then(result => {
                if(result){
                    this.props.history.push('/profile')
                }
            })
       
        .catch( err =>{
            console.log(err)        
        })
    }
    
    
    render(){
        return (
            <div className='container text-center'>
            <h2>Login</h2>
            <br/>
            <div className= "card boxarea">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control log" 
                name="email" id="email" aria-describedby="emailHelp" 
                placeholder="Email/ Username"value={this.state.email} onChange={ this.handleChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control log" name ="password" placeholder="Password" value={this.state.password} onChange={ this.handleChange}/>
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