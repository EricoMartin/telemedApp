import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom';
import  FacebookLogin from 'react-facebook-login';

import ProfilePage from './dashboard';

 class fbLogin extends Component {
    constructor(props){
        super(props);
            this.state ={
                isLoggedIn: false,
                userID: "",
                imgUrl: "",
                username: "",      
                email: "", 
                token: ""
            }
    }
  
    responseFacebook = response =>{
        this.setState({
            isLoggedIn:true,
            userID: response.userID,
            imgUrl: response.picture.data.url,
            username: response.name, 
            email: response.email,
            token: response.token
        })
        }
        componentClicked= () =>{console.log("clicked")
    }
    render() {
        let fbContent;
        if(this.state.isLoggedIn){
                fbContent = [
                    this.state.imgUrl,
                    this.state.username,
                    this.state.email
                ];
                axios.post(`http://localhost:5000/api/v1/client/update`, fbContent)
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
                this.setState({redirect: true})

                const {redirect} = this.state;
                    if(redirect){
                        return <Redirect push to="/profile"/> 
                    }
                    
                
        }else{
            fbContent =(<FacebookLogin
                appId="536477307227509"
                autoLoad={true}
                fields= "name, email, picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />);

            
        }
        
        return (
            
                <div>
                    {fbContent}
                </div>
            )
        
    }
}

export default withRouter(fbLogin);
