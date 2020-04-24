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



export default class CovidPage extends React.Component{
        constructor(props){
            super(props);
            this.tableRef = React.createRef();
            this.getNaijaData =this.getNaijaData.bind(this);
        };
        state = {
            loading:false,
            stats: [],
            dats: []
          };   
        
        useStyles = makeStyles(theme => ({
          root: {
            display: 'flex',
          },

        }));
        async getNaijaData(){
          await fetch('https://corona.lmao.ninja/v2/countries/Nigeria')
          .then(response => response.json())
          .then(res => {
              this.setState({ dats: res, loading: false }, () => console.log(res))
          })
          .catch(error => {
              console.log(error)
          });
        }
          componentDidMount(){
              this.setState({loading: true})
              this.getNaijaData();
              fetch('https://corona.lmao.ninja/v2/countries') 
              .then(response => response.json())
              .then(res => {
                  this.setState({ stats: res, loading: false }, () => console.log(res))
              })
              .catch(error => {
                  console.log(error)
              })
          }
         

    render(){

      // const selected = this.state.stats;
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
                    Nigeria Covid-19 Data Details  
                    <Router>
                    <button type="button" className="btn btn-primary"  onClick={()=> {this.props.history.replace('/covidstates')}}>States Data</button>
                    <button type="button" className="btn btn-primary" onClick={()=> {this.props.history.replace('/covidmap')}}>Visualize</button>
                    </Router>
                    </Typography>
                    </Toolbar>
                </AppBar>
                
                {console.log(this.state.dats.countryInfo)}
                <table class="table table-striped">
                    <thead class="black">
                        
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Country:</th>
                        <td>{this.state.dats.country}</td>
                        </tr>
                        <tr>
                        <th scope="row">Total cases: </th>
                        <td>{this.state.dats.cases}</td>
                        </tr>
                        <tr>
                        <th scope="row">Today's Cases: </th>
                        <td>{this.state.dats.todayCases}</td>
                        </tr>
                        <tr>
                        <th scope="row">Total Deaths: </th>
                        <td>{this.state.dats.deaths}</td>
                        </tr>
                        <tr>
                        <th scope="row">Today's Deaths: </th>
                        <td>{this.state.dats.todayDeaths}</td>
                        </tr>
                        <tr>
                        <th scope="row">Total Recovered:: </th>
                        <td>{this.state.dats.recovered}</td>
                        </tr>
                    </tbody>
                    </table>
               
        
        <MaterialTable style={{marginLeft:'10px', marginRight:'10px'}}
          title="Global Covid-19 Stats"
          columns={[
            { title: 'Country', field: 'country'},
            { title: 'Total Cases', field: 'cases' },
            { title: 'Current Cases', field: 'todayCases' },
            { title: 'Total Deaths', field: 'deaths' },
            { title: 'Current Deaths', field: 'todayDeaths' },
            { title: 'Recovered Patients', field:'recovered' },
            { title: 'Active Patients', field: 'active' },
            { title: 'Critical Patients', field: 'critical' },
            { title: 'Cases/million', field: 'casesPerOneMillion' },
            
          ]}
          data = {this.state.stats}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh',
              isFreeAction: true,
              onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
            }, 
          ]}
          options={{
            
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFF'
            }}
          } 
        />
        <br/>
      </React.Fragment>
      </div>
      </div>
    </div>
     );
    }
}