import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      imgUrl:"",
      publicId: "",
      file: '',
      imagePreviewUrl: '',
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://rocky-tor-82022.herokuapp.com/api/v1/posts/${this.props.match.params.id}`)
      .then(post => {
        this.setState({
          post: post.data
        });
      });
      const decoded = jwt_decode(localStorage['master-token']);  
      this.setState ({
            imgUrl: decoded.imgUrl,
            publicId: decoded.publicId,
            imagePreviewUrl:  decoded.imgUrl
      })
  }

  onDelete(e) {
    e.preventDefault();
    axios
      .post(`https://rocky-tor-82022.herokuapp.com/api/v1/posts/delete/${this.props.match.params.id}`)
      .then(post => {
        alert("Post Successfully Deleted!");
        this.props.history.push("/");
      });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} alt="user avatar" className="imgPreview" style={{width: "15rem"}}/>);
    } else {
    $imagePreview = (<Image cloudName="automart-app" publicId ={this.state.publicId} secret_url={this.state.imgUrl} height="100" width="100" src={this.state.imgUrl} className="imgPreview" crop="scale"alt="user avatar" />);
    }
    return (
        
      <div className="container m-8">
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
                <div className= "card text-center">
        <div className="flex justify-end">
          <small>
            <Link
              to={`/update/${this.state.post._id}`}
              className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={e => this.onDelete(e)}
              className="bg-red hover:bg-red-dark text-black font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </small>
          </div>
        </div>
        <br />
        <h1>{this.state.post.title}</h1>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
        
      </div>
    );
  }
}
export default withRouter(Single);