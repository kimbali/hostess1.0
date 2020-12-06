import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class HostessHome extends Component {


    handleRequests = (event) => {
        this.props.history.push('/hostess/requests')
    }

    handleEvents = (event) => {
        this.props.history.push('/hostess/events')
    }

    handleProfile = (event) => {
        this.props.history.push('/hostess/profile')
    }

    render() {
        return (
            <div className="home">
                <div><button onClick={this.handleRequests} className="submit" >MY REQUESTS</button></div>
                <div><button onClick={this.handleEvents} className="submit" >MY EVENTS</button></div>
                <div><button onClick={this.handleProfile} className="submit" >MY PROFILE</button></div>  
            </div>
        )
    }
}

export default withRouter(HostessHome)