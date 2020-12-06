import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Host from '../components/Host';
import HomeButton from '../components/HomeButton';

// var getAge = require('get-age')


class HostessProfile extends Component {

    state = {
        hostess: '',
    }

    componentDidMount() {
        logic.retrieveHostess(this.props.id, this.props.token)
            .then(hostess => this.setState({ hostess }))
    }

    editProfile = (event) => {
        event.preventDefault()

        this.props.hostessEditProfile(this.state.hostess)
    }


    render() {
        const { hostess } = this.state
        // const age = getAge(birth)

        return (
            <div>
                <HomeButton />
                <div className="profile">
                    {
                        hostess && (<div className="profile-box">
                            <Host hostess={hostess} />
                        </div>)
                    }
                    <div className="edit-logout-buttons">
                        <div>
                            <button onClick={this.editProfile} className="edit-profile-button">edit profile</button>
                        </div>
                        <div>
                            <a onClick={this.props.onLogout}>logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HostessProfile)


