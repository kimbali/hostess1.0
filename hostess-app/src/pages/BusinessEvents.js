import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import AnEvent from '../components/AnEvent'
import HomeButton from '../components/HomeButton'

class BusinessEvents extends Component {
    state = {
        events: ''
    }

    componentDidMount() {
        logic.retrieveBusiness(this.props.id, this.props.token)
            .then(business => this.setState({ events: business.events }))
    }

    handleNewEvent = event => {
        this.props.history.push('/new/event')
    }

    handleEditEvent = idE => {
        this.props.handleEditEvent(idE)
    }


    render() {
        const { events } = this.state
        return (
            <div>
                <HomeButton />
                <div className="new-event-box">
                    <button onClick={this.handleNewEvent}>post new event</button>
                </div>
                {
                    events && (<div className="event" >
                            {events.map(event => {
                                return (
                                    <div className="business-events">
                                        <AnEvent business={true} event={event} token={this.props.token} />
                                        <div>
                                            <button className="event-details-button" onClick={() => this.handleEditEvent(event._id)}>event details</button>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>)
                }
            </div>
        )
    }
}

export default withRouter(BusinessEvents)