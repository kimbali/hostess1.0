import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Landing from './pages/Landing'
import EditEvent from './pages/EditEvent';
import BusinessEditProfile from './pages/BusinessEditProfile';
import BusinessProfile from './pages/BusinessProfile';
import HostessProfile from './pages/HostessProfile';
import HostessEditProfile from './pages/HostessEditProfile';
import BusinessEvents from './pages/BusinessEvents';
import NewEvent from './pages/NewEvent';
import HostessRequests from './pages/HostessRequests';
import BusinessRegister from './pages/BusinessRegister';
import HostessRegister from './pages/HostessRegister';
import BusinessHome from './pages/BusinessHome';
import HostessHome from './pages/HostessHome';
import Search from './pages/Search';
import HostessEvents from './pages/HostessEvents';



class App extends Component {

  state = {
    token: sessionStorage.getItem('token') || '',
    profile: sessionStorage.getItem('profile') || '',
    id: sessionStorage.getItem('id') || '',
    idE: '',
    business: '',
    hostess: ''
  }

  hostessLogin = (id, token, isRegister) => {
    this.setState({ id, token, profile: 'hostess' })

    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'hostess')

    
    if(isRegister) this.props.history.push('/hostess/register')
    if(!isRegister) this.props.history.push('/hostess/home')
  }
  
  businessLogin = (id, token, isRegister) => {
    this.setState({ id, token, profile: 'business' })
    
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('profile', 'business')

    if(isRegister) this.props.history.push('/business/register')
    if(!isRegister) this.props.history.push('/business/home')
  }

  isHostessLoggedIn() {
    if(this.state.profile === 'hostess') return true
  }
  
  isBusinessLoggedIn() {
    if(this.state.profile === 'business') return true
  }

  onLogout = event => {
    event.preventDefault()

    this.setState({ id: '', token: '', profile: ''})

    sessionStorage.clear()
  }

  handleEditEvent = (idE) => {
    this.setState({ idE })

    this.props.history.push('/edit/event')
  }

  handleEditBusiness = (business) => {
    this.setState({ business })

    this.props.history.push('/business/edit/profile')
  }

  handleEditHostess = (hostess) => {
    this.setState({ hostess })

    this.props.history.push('/hostess/edit/profile')
  }


  render() {
    const { id, token, business, hostess, idE } = this.state

    return (
      <div>

        <Switch>

          <Route exact path="/" render={() => this.isHostessLoggedIn() ? <Redirect to="/hostess/home" /> : this.isBusinessLoggedIn() ? <Redirect to="/business/home" /> : <Landing hostessLogged={this.hostessLogin} businessLogged={this.businessLogin} />} />

          <Route exact path="/business/home" render={() => this.isBusinessLoggedIn() ? <BusinessHome /> : <Redirect to="/"/>} />

          <Route exact path="/business/register" render={() => this.isBusinessLoggedIn() ? <BusinessRegister id={id} token={token} /> : <Redirect to="/"/>} />

          <Route exact path="/business/profile" render={() => this.isBusinessLoggedIn() ? <BusinessProfile businessProfile={this.handleEditBusiness} id={id} token={token} onLogout={this.onLogout}/> : <Redirect to="/"/>} />

          <Route exact path="/business/edit/profile" render={() => this.isBusinessLoggedIn() ? <BusinessEditProfile business={business} id={id} token={token} onLogout={this.onLogout} /> :  <Redirect to="/"/>} />

          <Route exact path="/business/events" render={() => this.isBusinessLoggedIn() ? <BusinessEvents handleEditEvent={this.handleEditEvent} id={id} token={token} onLogout={this.onLogout} /> : <Redirect to="/"/>} />
          
          <Route exact path="/new/event" render={() => this.isBusinessLoggedIn() ? <NewEvent id={id} token={token} /> : <Redirect to="/"/>} />

          <Route exact path="/edit/event" render={() => this.isBusinessLoggedIn() ? <EditEvent idE={idE} id={id} token={token} /> : <Redirect to="/"/>} />

          <Route exact path="/hostess/home" render={() => this.isHostessLoggedIn() ? <HostessHome /> : <Redirect to="/"/>} />
          
          <Route exact path="/hostess/register" render={() => this.isHostessLoggedIn() ? <HostessRegister id={id} token={token} /> : <Redirect to="/"/>} />

          <Route exact path="/hostess/profile" render={() => this.isHostessLoggedIn() ? <HostessProfile hostessEditProfile={this.handleEditHostess} id={id} token={token} onLogout={this.onLogout}/> : <Redirect to="/"/>} />

          <Route exact path="/hostess/edit/profile" render={() => this.isHostessLoggedIn() ? <HostessEditProfile hostess={hostess} id={id} token={token} onLogout={this.onLogout}/> : <Redirect to="/" />} />

          <Route exact path="/hostess/requests" render={() => this.isHostessLoggedIn() ? <HostessRequests id={id} token={token} /> : <Redirect to="/" />} />

          <Route exact path="/search" render={() => this.isBusinessLoggedIn() ? <Search id={id} token={token} /> : <Redirect to="/" />} />

          <Route exact path="/hostess/events" render={() => this.isHostessLoggedIn() ? <HostessEvents id={id} token={token} /> : <Redirect to="/" />} />

        </Switch>

      </div>
    )
  }
}

export default withRouter(App)
