import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BusinessCard from '../components/BusinessCard'
import logic from '../logic'

class AnEvent extends Component {

    state = {
        applied: false,
        confirmed: false
    }

    joinToEvent = (idE) => {
        logic.joinToEvent(this.props.id, idE, this.props.token)
            .then(() => this.setState({ applied: true }))
            .catch(err => this.setState({ applied: true }))
    }

    assist = (idE) => {
        logic.iAssist(this.props.id, idE, this.props.token)
            .then(() => this.setState({ confirmed: true }))
            .catch(() => this.setState({ confirmed: true }))
    }

    render() {

        const { event, simpleHostess, cardDetails, toApply, toConfirm, toAssist } = this.props

        return (
            <div className="big big-event">
                {
                    cardDetails && (
                        <div className="event-left">
                            <BusinessCard business={event.business} />
                        </div>
                    )
                }
                {
                    event && (
                        <div className="event-right" >
                            <div>
                                <h2>{event.title}</h2>
                                <div>Location: {event.location}</div>
                                <div>Date: {event.date}</div>
                                <div>Schedule: {event.hours}</div>
                                <div>Salary: {event.salary}</div>
                                <div className="briefing">Final goal of the event: {event.goal}</div>
                                {
                                    event.briefing && !simpleHostess && (
                                        <div>
                                            <div className="briefing">Briefing: {event.briefing}</div>
                                            <div>Contact name: {event.contactName}</div>
                                            <div>Contact phone: {event.contactPhone}</div>
                                        </div>
                                    )
                                }
                            </div>
                            { !toAssist && (<div className="num-hostess">
                                    <ul>
                                        <li>Candidates: {event.candidates.length}</li>
                                        <li>Wating for confirmation: {event.approved.length}</li>
                                        <li className="confirmed">Confirmed: {event.confirmed.length}</li>
                                    </ul>
                                </div>)
                            }
                            {
                                (toApply && !this.state.applied) && (<div>
                                    <button onClick={() => this.joinToEvent(event._id)}>apply to the event</button>
                                </div>)
                            }
                            {
                                (toConfirm && !this.state.confirmed) && (<div>
                                    <button onClick={() => this.assist(event._id)}>confirm my attendance to the job</button>
                                </div>)
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(AnEvent)