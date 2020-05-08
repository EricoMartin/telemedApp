import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
//import imgurl from '../img/avatar.png';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';
import dotenv from 'dotenv';
import EditForm from '../components/clients/imageForm';


import Facebook from './fbLogin';

dotenv.config();

 class ProfilePage extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state ={
            _id: "",
            userId: "",
            firstName : "",
            lastName: "",
            username: "",
            email: "",
            phone:"",
            age: "",
            createdAt: "",
            isAdmin: "",
            imgUrl:"",
            publicId: "",
            file: '',
            imagePreviewUrl: '',
            imgState: true,
            showImgState: false
        }
        this.logOut = this.logOut.bind(this);
        this.clickButton = this.clickButton.bind(this);
        this.closedBtn = this.closedBtn.bind(this);
    }
 

    componentDidMount(){
        const decoded = jwt_decode(localStorage['master-token']);  

        
            this.setState ({
            _id: decoded.newClient._id,
            userId: decoded.newClient.userId,
            firstName : decoded.newClient.firstName,
            lastName: decoded.newClient.lastName,
            username: decoded.newClient.username,
            email: decoded.newClient.email,
            phone: decoded.newClient.phone,
            age: decoded.newClient.age,
            createdAt: decoded.newClient.createdAt,
            isAdmin: decoded.newClient.isAdmin,
            imgUrl: decoded.newClient.imgUrl,
            publicId: decoded.newClient.publicId,
            imagePreviewUrl:  decoded.newClient.imgUrl,
            imgState: true,
            showImgState: false  
        });
    }

    clickButton(){
        this.setState ({
            ...this.state,
            imgState: false,
            showImgState: true
        });
    }
    closedBtn(){
        this.setState ({
            ...this.state,
            imgState: true,
            showImgState: false
        });
    }

    logOut(evt){
        evt.preventDefault();
        localStorage.removeItem('master-token');
        axios.post('https://rocky-tor-82022.herokuapp.com/api/v1/auth/signout', {
            email: this.state.email,
            password: this.state.password
        })
        this.props.history.push('/');
    }
    ImageDiv = () =>{
        return <div>
            <img src={this.state.imagePreviewUrl}  height="50" width="50" className="imgPreview" crop="scale"alt="user avatar" /> 
        </div>
    }
    EditImageButton = props => {
        return (<div><this.ImageDiv/><h6 className ="black-text">Image size must not be more than 1MB! Suggested: 150px by 150px.</h6><button className= "btn btn-primary btn-rounded btn-block" style= {{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '140px' }}
        onClick={props.editImage}>Edit Image</button></div>)
      }
      CloseButton = props => {
        return <button className= "btn btn-primary btn-rounded btn-block" style= {{
        margin: 'auto',
        marginTop: '12px',
        width: '100px' }}
        onClick={props.closeImage}>Cancel</button>
      }
    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="user avatar" className="imgPreview" style={{width: "15rem"}}/>);
        } else {
        $imagePreview = (<Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="100" width="100" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" />);
        }
        return (
            <div className="container-fluid">
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
                        <div>welcome {this.state.username}
                        <img src={imagePreviewUrl}  height="50" width="50" className="imgPreview" crop="scale"alt="user avatar" /></div>
                        </div>
                    </div>
                </nav>
                <h2 className="text-center">User Profile</h2>|<br/><br/>
                    <div className="card text-center container-sm" >
                    <Link to="/doctors" className="consult"><h5>Consult a Doctor</h5></Link>
                    {this.state.imgState &&  
                    <this.EditImageButton  editImage={this.clickButton}/>}
                        {this.state.showImgState && <EditForm/>}
                        {this.state.showImgState && <this.CloseButton closeImage={this.closedBtn}/>}
                    <div className="card-body">
                <h4 className="card-text">Welcome {this.state.username}!</h4>
            
                    <table class="table table-striped">
                    <thead class="black">
                        
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Username:</th>
                        <td>{this.state.username}</td>
                        </tr>
                        <tr>
                        <th scope="row">Name:</th>
                        <td>{this.state.firstName} {this.state.lastName}</td>
                        </tr>
                        <tr>
                        <th scope="row">Email: </th>
                        <td>{this.state.email}</td>
                        </tr>
                        <tr>
                        <th scope="row">Phone: </th>
                        <td>0{this.state.phone}</td>
                        </tr>
                        <tr>
                        <th scope="row">User Id: </th>
                        <td>{this.state.userId}</td>
                        </tr>
                    </tbody>
                    </table>
                                    </div>
                </div>


                <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32379154.46231!2d-5.301560269647846!3d7.839093841990719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0c5a0341aed1%3A0x4794f28a86fc06b9!2sCedar%20Crest%20Hospitals%20Ltd!5e0!3m2!1sen!2sng!4v1582858066684!5m2!1sen!2sng" style={{
  width:"100%",
  margin: "auto",
  paddingBlock: "auto", 
  height:"500",
  frameborder:"0",
   style:"border:0",
    allowfullscreen:""
}}></iframe>

                <div className="card text-center container-sm" >
                <div className="card-header">
                    <p>Medical Details</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{this.state.firstName}</li>
                    <li className="list-group-item">{this.state.lastName}</li>
                    <li className="list-group-item">{this.state.email}</li>
                </ul>
                </div>

                
            </div>
    );
}
}

export default withRouter(ProfilePage);