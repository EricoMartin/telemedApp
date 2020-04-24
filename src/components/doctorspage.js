import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';
import Navbar from '../components/navbar';

export default class DoctorsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            _id: "",
            firstName : "",
            lastName: "",
            hospital: "",
            hospitalAddress: "",
            email: "",
            phone:"",
            regID: "",
            workingHours: "",
            consultFee: "",
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
            _id: decoded.newDoc._id,
            hospital: decoded.newDoc.hospital,
            hospitalAddress: decoded.newDoc.hospitalAddress,
            workingHours: decoded.newDoc.workingHours,
            firstName : decoded.newDoc.firstName,
            lastName: decoded.newDoc.lastName,
            email: decoded.newDoc.email,
            phone: decoded.newDoc.phone,
            specialization: decoded.newDoc.specialization,
            regID: decoded.newDoc.regID,
            consultFee: decoded.newDoc.consultFee,
            createdAt: decoded.newDoc.createdAt,
            imgUrl: decoded.newDoc.imgUrl,
            publicId: decoded.newDoc.publicId,
            imagePreviewUrl:  decoded.newDoc.imgUrl
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

        await axios.post(`https://rocky-tor-82022.herokuapp.com/api/v1/doc/upload/${this.state._id}`, 
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
                <h2 className="text-center">Doctors Profile</h2>|<br/><br/>
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
                <h4 className="card-text">Welcome Dr {this.state.firstName}!</h4>
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
                        <th scope="row">Hospital Name:</th>
                        <td>{this.state.hospital}</td>
                        </tr>
                        <tr>
                        <th scope="row">Hospital Address:</th>
                        <td>{this.state.hospitalAddress}</td>
                        </tr>
                        <tr>
                        <th scope="row">Registration ID:</th>
                        <td>{this.state.regID}</td>
                        </tr>
                        <tr>
                        <th scope="row">Doctors Specialization:</th>
                        <td>{this.state.specialization}</td>
                        </tr>
                        <tr>
                        <th scope="row">Opening Hours:</th>
                        <td>{this.state.workingHours}</td>
                        </tr>
                        <tr>
                        <th scope="row">Consultation Fee:</th>
                        <td>{this.state.consultFee}</td>
                        </tr>
                        <tr>
                        <th scope="row">User Id: </th>
                        <td>{this.state.userId}</td>
                        </tr>
                    </tbody>
                    </table>

                    <button className="btn-success" >Message Dr {this.state.firstName}!</button>
                    </div>
                </div>
                </div>
                </div>
                )
                }

}