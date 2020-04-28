import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Navbar from '../components/navbar';
import jwt_decode from 'jwt-decode';
import imageurl from '../img/avatar.png';



export default class CovidPage extends React.Component{
        constructor(props){
            super(props);
            this.state = {
              loading:false,
              stats: [],
              dats: [],
              imgUrl:"",
              publicId: "",
              imagePreviewUrl: '',
            };   
            this.tableRef = React.createRef();
            this.getNaijaData =this.getNaijaData.bind(this);
        };
        
        componentDidMount(){
          const decoded = jwt_decode(localStorage['master-token']);
            this.setState({
              loading: true,
              imgUrl: decoded.imgUrl,
              publicId: decoded.publicId,
              imagePreviewUrl:  decoded.imgUrl
            })
            this.getNaijaData();
            fetch('https://corona.lmao.ninja/v2/countries') 
            .then(response => response.json())
            .then(res => {
                this.setState({ stats: res, loading: false }, () => console.log(res))
            })
            .catch(error => {
                console.log(error)
            })
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
          
         

    render(){

      // const selected = this.state.stats;
    return(
    <div className="container">
       <Navbar />
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