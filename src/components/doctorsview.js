import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Navbar from '../components/navbar';

export default class DoctorsViewPage extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state ={
            _id: this.props.match.params.id,
            firstName : "",
            lastName: "",
            email: "",
            phone:"",
            regID: "",
            imgUrl:"",
            file: '',
            imagePreviewUrl: '',
        }
    }
    componentDidMount(){

        axios.get(`https://rocky-tor-82022.herokuapp.com/api/v1/doc/${this.state._id}`).then(result =>{
           
            this.setState({result: result.data})
            console.log(result)
            return  this.setState ({
                _id: result.data._id,
                firstName : result.data.firstName,
                lastName: result.data.lastName,
                email: result.data.email,
                phone: result.data.phone,
                regID: result.data.regID,
                imgUrl: result.data.imgUrl,
                imagePreviewUrl:  result.data.imgUrl
            });
        })
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