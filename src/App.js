import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css';


import SignupUsers from '../src/components/signup';
import Select from '../src/components/select';
import LoginUsers from '../src/components/login';
import LandingPage from '../src/components/coverpage';
import UsersProfilePage from '../src/components/dashboard';
import CovidInfo from '../src/components/covido';
import MapContainer from '../src/components/covidMap';
import StatesContainer from '../src/components/covidStates';
import Blog from '../src/components/blogpage';
import DoctorsPage from '../src/components/doctorspage';
import DoctorsLogin from '../src/components/doclogin';
import DoctorSignup from '../src/components/docsignup';
import Single from '../src/components/single';
import Update from '../src/components/update';
import Doctors from '../src/components/docList';
import DoctorsView from '../src/components/doctorsview';
import HospitalPage from '../src/components/hospital';
import HospitalLogin from '../src/components/hospLogin';
import HospitalSignup from '../src/components/hospSignup';

function App() {
  return(
  <Router>
  <Route path='/signup' exact component ={SignupUsers}/>
  <Route path='/signin'  exact component ={LoginUsers}/>
  <Route path='/' exact component ={LandingPage}/>
  <Route path='/profile'  component ={UsersProfilePage}/>
  <Route path= '/select' component = {Select}/>
  <Route path= '/covido' component ={CovidInfo}/>
  <Route path= '/covidmap' component ={MapContainer}/>
  <Route path= '/covidstates' component ={StatesContainer}/>
  <Route path= '/docs/:id' component ={DoctorsView}/>
  <Route path= '/doc' component ={DoctorsPage}/>
  <Route path= '/doclogin' component ={DoctorsLogin}/>
  <Route path= '/docsignup' component ={DoctorSignup}/>
  <Route path= '/blog' component ={Blog}/>
  <Route path= '/post/:id' component ={Single}/>
  <Route path= '/update/:id' component={Update}/>
  <Route path= '/doctors' component={Doctors}/>
  <Route path= '/hosp' component={HospitalPage}/>
  <Route path= '/hosplogin' component={HospitalLogin}/>
  <Route path= '/hospsignup' component={HospitalSignup}/>
  </Router>
  
  )
}

export default App;
