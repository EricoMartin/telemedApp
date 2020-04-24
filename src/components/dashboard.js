import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
//import imgurl from '../img/avatar.png';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';
import dotenv from 'dotenv';


import Facebook from './fbLogin';

dotenv.config();

export default class ProfilePage extends React.Component{
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
        }
        this.logOut = this.logOut.bind(this);
        this.submitImage = this.submitImage.bind(this);
        this.displayImage = this.displayImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            publicId: decoded.newClient.publicId  
        });
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        const formData = new FormData()
            formData.append(
                'images',
                this.state.file
            )

        await axios.post(`http://localhost:5000/api/v1/clients/upload/${this.state._id}`, 
            formData,
            {
                onUploadProgress: progressEvent => {
                console.log(progressEvent.loaded / progressEvent.total)
                }
              }
        )
      }
    submitImage(evt){
        evt.preventDefault();
        let reader = new FileReader();
        let file = evt.target.files[0];

        reader.onloadend =  () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
          reader.readAsDataURL(file);
        
    }

    async displayImage(evt){
        evt.preventDefault();
        const id = this.state._id;
        await axios.get(`https://rocky-tor-82022.herokuapp.com/api/v1/clients/display/${id}`, (err, result)=>{
            if(err){
                console.log(err)
            }
            return this.setState.imgUrl = result;
        })
        
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
    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="user avatar" className="imgPreview" style={{width: "15rem"}}/>);
        } else {
        $imagePreview = (<Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="100" width="100" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" />);
        }
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
                        <div>welcome {this.state.username}
                        <Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="50" width="50" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" /></div>
                        </div>
                    </div>
                </nav>
                <h2 className="text-center">User Profile</h2>|<br/><br/>
                    <div className="card text-center container-sm" >
                    <Link to="/doctors" className="consult"><h5>Consult a Doctor</h5></Link>
                        <form className="welcomeFeature">
                        <div className="card-imgUrl-top text-center" >
                            
                            {$imagePreview}
                        </div>  
                        <div className ="edittableImage">
                            <input className ="images" type="file" encType="multipart/form-data" class="btn-primary" onChange={this.submitImage} />
                            <br/>
                            <br/>
                            <button className= "btn btn-primary"  onClick= {this.handleSubmit}>Submit</button>
                        </div> 
                        </form>
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
