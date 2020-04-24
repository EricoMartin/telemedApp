
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';
import Navbar from '../components/navbar';

export default class HospitalsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            _id: "",
            name : "",
            hospital: "",
            address: "",
            email: "",
            phone:"",
            regNumber: "",
            workingHours: "",
            website: "",
            regFee: "",
            services: "",
            specialization: "",
            createdAt: "",
            imgUrl:"",
            publicId: "",
            file: '',
            imagePreviewUrl: '',
        }
        this.submitImage = this.submitImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const decoded = jwt_decode(localStorage['master-token']);  

        
            this.setState ({
            _id: decoded.newHospital._id,
            address: decoded.newHospital.address,
            workingHours: decoded.newHospital.workingHours,
            name: decoded.newHospital.name,
            email: decoded.newHospital.email,
            phone: decoded.newHospital.phone,
            website: decoded.newHospital.website,
            regNumber: decoded.newHospital.regNumber,
            services: decoded.newHospital.services,
            regFee: decoded.newHospital.regFee,
            createdAt: decoded.newHospital.createdAt,
            ambulances: decoded.newHospital.ambulances,
            specialization: decoded.newHospital.specialization,
            imgUrl: decoded.newHospital.imgUrl,
            publicId: decoded.newHospital.publicId,
            imagePreviewUrl:  decoded.newHospital.imgUrl
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

        await axios.post(`http://localhost:5000/api/v1/hosp/update/${this.state._id}`, 
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
                        <div>welcome {this.state.firstName}
                        <img src={imagePreviewUrl}  height="50" width="50" className="imgPreview" crop="scale"alt="user avatar" /></div>
                        </div>
                    </div>
                </nav>
                <h2 className="text-center">Hospitals Profile</h2>|<br/><br/>
                    <div className="card text-center container-sm" >
                    <Link to="/doctors" className="consult"><h5>Visit a Hospital</h5></Link>
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
                <h4 className="card-text">Welcome {this.state.firstName}!</h4>
                </div>
                <div className= "row">
                    <div className="col-sm">
                    <img src={imagePreviewUrl} alt="user avatar" width="200px" height="200px"/>
                    </div>
                    <div className="col-8">
                    <table className="table table-striped">
                    <thead className="black">
                        
                    </thead>
                    <tbody>
                        
                        <tr>
                        <th scope="row">Hospital Name:</th>
                        <td>{this.state.name}</td>
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
                        <th scope="row">Hospital Specialization:</th>
                        <td>{this.state.specialization}</td>
                        </tr>
                        <tr>
                        <th scope="row">Hospital Address:</th>
                        <td>{this.state.address}</td>
                        </tr>
                        <tr>
                        <th scope="row">Registration Number:</th>
                        <td>{this.state.regNumber}</td>
                        </tr>
                        <tr>
                        <th scope="row">Opening Hours:</th>
                        <td>{this.state.workingHours}</td>
                        </tr>
                        <tr>
                        <th scope="row">Registration Fee:</th>
                        <td>{this.state.regFee}</td>
                        </tr>
                        <tr>
                        <th scope="row">Website: </th>
                        <td>{this.state.website}</td>
                        </tr>
                    </tbody>
                    </table>

                    <button className="btn-success" >Register at {this.state.name} Hospital!</button>
                    </div>
                </div>
                </div>
                </div>
                )
                }

}