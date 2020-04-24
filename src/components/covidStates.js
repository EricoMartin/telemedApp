import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { Image } from 'cloudinary-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



export default class CovidState extends React.Component{
        constructor(props){
            super(props);
            this.tableRef = React.createRef();
            this.getElem = this.getElem.bind(this);
            this.state = {
              loading:false,
              stats: []
            };   
        };
        
        
        useStyles = makeStyles(theme => ({
          root: {
            display: 'flex',
          },

        }));

/*         
          
          /* for (const item of Object.values(dats)) {
            // `item` is the array element, **not** the index
            
             return Object.values(item);
            } */
        
    
          componentDidMount(){
              this.setState({loading: true})
              fetch('https://covidnigeria.herokuapp.com/') 
              .then(response => response.json())
              .then(res => {
                  this.setState({ stats: res.data.states, loading: false },  () => console.log(this.state.stats))
              })
              .catch(error => {
                  console.log(error)
              })
          }
          getElem(){
          const arr = [];
          return this.state.stats.map(item => {
            console.log(item);
            const { state, death, discharged, casesOnAdmission, confirmedCases} = item
            return (<tr key={state}>
            <td>{state}</td>
            <td>{confirmedCases}</td>
            <td>{casesOnAdmission}</td>
            <td>{death}</td>
            <td>{death}</td>
            <td>{discharged}</td>
            </tr>)
          })
        }
        
    render(){
    return(
    <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light container">
        <a className="navbar-brand" href="#"><h2>Telemed</h2></a>
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

                <div className="card text-center container-sm" >
                <div className="card-header">
                
                
                <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" className='text-center'>
                    Nigerian States Covid-19 Data  
                    <Router>
                    <button type="button" className="btn btn-primary"  onClick={()=> {this.props.history.replace('/covido')}}>Country Data</button>
                    <button type="button" className="btn btn-primary" onClick={()=> {this.props.history.replace('/covidmap')}}>Visualize</button>
                    </Router>
                    </Typography>
                    </Toolbar>
                </AppBar>
                
                {console.log(this.state.stats)} 
              
                
                <table class="table table-striped">
                    <thead class="black">
                      <tr >
                      <th>States</th>
                      <th>Confirmed Cases</th>
                      <th>Current Cases</th>
                      <th>Deaths</th>
                      <th>Total Deaths</th>
                      <th>discharged</th>
                      </tr>  
                    </thead>
                    <tbody>
                      {this.getElem()}
                    </tbody>
                    </table>
        <br/>
        

        
      </React.Fragment>
      
      </div>
      </div>
    </div>
     );
    }
}