import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import BusinessCard from '../components/BusinessCard'
import HomeButton from '../components/HomeButton'

class BusinessProfile extends Component {
    state = {
        business: '',
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.id, this.props.token)
            .then(business => this.setState({ business }))
    }

    editProfile = (event) => {
        event.preventDefault()

        this.props.businessProfile(this.state.business)
    }

    render() {

        const { business } = this.state

        return (
            <div>
                <HomeButton />
                {
                    business && (<div className="profile">
                        <div className="big">
                            <div className="left-business">
                                    <img src={business.businessCard} alt="photo" className="img-business"  />
                            </div>
                            <div className="right-business-profile">
                                <BusinessCard business={business} profileBusiness={true} />
                            </div>
                        </div>
                        <div className="edit-logout-buttons">
                            <div>
                                <button onClick={this.editProfile} className="right-box" >edit profile</button>
                            </div>
                            <a role="menuitem" onClick={this.props.onLogout}> Logout </a>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}

export default withRouter(BusinessProfile)