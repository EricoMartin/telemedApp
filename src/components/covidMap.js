import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {InfoWindow, Marker } from 'google-maps-react';
import { Image } from 'cloudinary-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navbar from '../components/navbar';

const mapStyles = {
  width: '95.5%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
    loading:false,
    stats: [],
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount(){
    this.setState({loading: true})
    fetch('https://covidnigeria.herokuapp.com/') 
    .then(response => response.json())
    .then(res => {
        this.setState({ stats: res, loading: false }, () => console.log(res))
    })
    .catch(error => {
        console.log(error)
    })
}

  render() {
    return (
      <div className="container">
      <Navbar />
              <div className="card text-center container-sm" >
              <div className="view overlay">
      <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" className='text-center'>
                    Nigeria Covid-19 Data 
                    <Router>
                    <button type="button" className="btn btn-primary" style= {{margin: "0 14.6vw 0 14.6vw "}} onClick={()=> {this.props.history.replace('/covido')}}>Country Data</button>
                    <button type="button" className="btn btn-primary" onClick={()=> {this.props.history.replace('/covidmap')}}>Visualize</button>
                    </Router>
                    </Typography>
                    </Toolbar>
                </AppBar>
      <Map
        google={this.props.google}
        zoom={6.8}
        style={mapStyles}
        initialCenter={{
         lat: 10.00,
         lng: 8.00
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
        </React.Fragment>
        </div>
        </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCcwazb-T7zvceyA4VLWVB-eXvwj-XEUIA"
})(MapContainer);