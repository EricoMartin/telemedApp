import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';

class NewUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/v1/posts/${this.props.match.params.id}`)
      .then(post => {
        this.setState({
          title: post.data.title,
          content: post.data.content
        });
      });
      const decoded = jwt_decode(localStorage['master-token']);  

        
            this.setState ({
            imgUrl: decoded.newDoc.imgUrl,
            publicId: decoded.newDoc.publicId,
            imagePreviewUrl:  decoded.newDoc.imgUrl
        });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      id: this.props.match.params.id,
      title: this.state.title,
      content: this.state.content
    };
    axios.post(`http://localhost:5000/api/v1/posts/update/${data.id}`, data).then(post => {
      alert("Post Successfully Updated!");
      this.props.history.replace(`/post/${this.props.match.params.id}`);
    });
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
                <div className= "card text-center container-sm">
        <h1>Update an existing post</h1>
        <form onSubmit={this.onSubmit}>
          <div className="m-8">
            <label 
              htmlFor="title"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
            
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="m-8">
            <label
              htmlFor="content"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              onChange={this.onChange}
              value={this.state.content}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              name="content"
              
            />
          </div>

          <div className="flex justify-center">
            <input
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Save"
              
            />
            <Link
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
              to={`/post/${this.props.match.params.id}`}
            >
              Cancel
            </Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
export default withRouter(NewUpdate);