import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class BusinessHome extends Component {

    handleSearch = (event) => {
        this.props.history.push('/search')
    }

    handleEvents = (event) => {
        this.props.history.push('/business/events')
    }

    handleProfile = (event) => {
        this.props.history.push('/business/profile')
    }


    render() {
        return (
            <div className="home">
                <div>
                    <button className="submit" onClick={this.handleSearch}>FIND WORKERS</button>
                </div>
                <div>
                    <button className="submit" onClick={this.handleEvents}>MY EVENTS</button>
                </div>
                <div>
                    <button className="submit" onClick={this.handleProfile}>MY PROFILE</button>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessHome)