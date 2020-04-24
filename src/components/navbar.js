import React from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';

export default class ProfilePage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            file: '',
            imagePreviewUrl: '',
        }
        this.logOut = this.logOut.bind(this);
    }

    logOut(evt){
        evt.preventDefault();
        localStorage.removeItem('master-token');
        axios.post('http://localhost:5000/api/v1/auth/signout', {
            email: this.state.email,
            password: this.state.password
        })
        this.props.history.replace('/');
    }
    render(){
        return (
            <div className="container">
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
                        <a className="nav-item nav-link" href="/" onClick={this.logOut}>Logout</a>
                        </div>
                        <div className="smWelcomeFeature">
                        <div>welcome {this.state.firstName}
                        <Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="50" width="50" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" /></div>
                        </div>
                    </div>
                </nav>
                </div>
                )
        }
}