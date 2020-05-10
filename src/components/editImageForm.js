import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';
import Navbar from '../components/navbar';

export default class EditImageForm extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            _id: "",
            imgUrl:"",
            publicId: "",
            file: '',
            imagePreviewUrl: '',
            imgState: true,
            showImgState: false
        }
        this.submitImage = this.submitImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickButton = this.clickButton.bind(this);
    }
    componentDidMount(){
        const decoded = jwt_decode(localStorage['master-token']);  

        
            this.setState ({
            _id: decoded.newDoc._id,
            imgUrl: decoded.newDoc.imgUrl,
            publicId: decoded.newDoc.publicId,
            imagePreviewUrl:  decoded.newDoc.imgUrl,
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
        let $imagePreview = null;
        let {imagePreviewUrl} = this.state;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="user avatar" className="imgPreview" />);
            } else {
            $imagePreview = (<Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="100" width="100" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" />);    
            }
            return (
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
        )
    }
}