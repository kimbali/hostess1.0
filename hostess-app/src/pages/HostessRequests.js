import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import HomeButton from '../components/HomeButton'
import BusinessCard from '../components/BusinessCard';

class HostessRequests extends Component {
    state = {
        requests: [],
        error: ''
    }

    componentDidMount() {
        logic.retrieveHostess(this.props.id, this.props.token)
            .then(hostess => {
                let newRequests = []
                let acceptedBusines = []

                hostess.accepted.map(business => acceptedBusines.push(business._id))

                hostess.requests.map(business => {
                    if (!(acceptedBusines.indexOf(business._id) !== -1)) newRequests.push(business)
                })

                this.setState({ requests: newRequests })
            })
    }

    render() {

        const { requests } = this.state

        return (
            <div>
                <HomeButton />
                <div className="big">
                    <div className="left">
                        <p>
                            Committed employees bring added value to the organisation, including through their determination, proactive support, relatively high productivity and an awareness of quality. They are also less likely to call in sick or to leave the organisation. Non-committed employees can work against the organisation and hold back the organisation's success.
                    </p>
                    </div>
                    <div className="right">
                        {
                            requests.length ? (<div>
                                {requests.map(business => {
                                    return (<div className="requests">
                                            <BusinessCard request={true} business={business} id={this.props.id} token={this.props.token} />
                                            {/* <button onClick={ () => this.handleClick(business._id)}>accept to work with {business.name}</button> */}
                                        </div>
                                    )
                                })}
                            </div>) : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HostessRequests)