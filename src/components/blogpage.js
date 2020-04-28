import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; 
import { Image } from 'cloudinary-react';

class BlogPage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            posts: [],
            _id: "",
            firstName : "",
            imgUrl:"",
            publicId: "",
            file: '',
            imagePreviewUrl: '',
        }
    }
    componentDidMount(){
        axios.get(`https://rocky-tor-82022.herokuapp.com/api/v1/post/`).then(posts => {
            this.setState({  
              posts: posts.data,
            });
            
          });
          console.log(this.state.posts)

        const decoded = jwt_decode(localStorage['master-token']);  

        
            this.setState ({
              _id: decoded._id,
            firstName: decoded.firstName,
            imgUrl: decoded.imgUrl,
            publicId: decoded.publicId,
            imagePreviewUrl:  decoded.imgUrl
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
                <h2 className="text-center">Blog Posts</h2>|<br/><br/>
                    <div className="card text-center container-sm" >
                    <Link to="/doctors" className="consult"><h5>Consult a Doctor</h5></Link>
                        
                    <div className="card-body">
                <h4 className="card-text">Welcome  {this.state.firstName}!</h4>
                </div>
                
                <div className="m-8">
        <ul className="list-group">
          {this.state.posts.map(post => (
            <li className="list-group-item d-flex align-items-center justify-content-between" key={post.title}>
              <h5>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </h5>
              <span className="badge badge-primary badge-pill">{post.numComments}</span>
            </li>
          ))}
        </ul>
      </div>
                    
                </div>
                </div>
                )
                }

}

export default withRouter(BlogPage);