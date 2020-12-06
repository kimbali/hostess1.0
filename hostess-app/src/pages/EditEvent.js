import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Host from '../components/Host'
import AnEvent from '../components/AnEvent';
import HomeButton from '../components/HomeButton';
// var moment = require('moment');

class EditEvent extends Component {

    state = {
        briefing: '',
        contactName: '',
        contactPhone: '',
        edit: false,
        error: '',
        newDetails: true,
        event: ''
    }

    componentDidMount() {
        const { id, idE, token } = this.props

        logic.retrieveEvent(id, idE, token)
            .then(event => this.setState({ event }))
    }

    handleBriefing = (event) => {
        this.setState({ briefing: event.target.value })
    }

    handleName = (event) => {
        this.setState({ contactName: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ contactPhone: event.target.value })
    }

    handleUpdate = (event) => {
        const { contactName, contactPhone, briefing } = this.state.event

        this.setState({ edit: true, contactName, contactPhone, briefing })
    }

    // handleEditSubmit = (event) => {
    //     event.preventDefault()

    //     const { contactName, contactPhone, briefing } = this.state

    //     logic.makeBriefing(this.props.id, this.props.event._id, contactName, contactPhone, briefing, this.props.token)
    //         .then(() => this.setState({ edit: false, newDetails: false }))
    //         .catch(err => this.setState({ error: err.message }))
    // }

    handleEditSubmit = (event) => {
        event.preventDefault()

        const { id, idE, token } = this.props

        const { contactName, contactPhone, briefing } = this.state

        logic.makeBriefing(id, idE, contactName, contactPhone, briefing, token)
            .then(() => {
                logic.retrieveEvent(id, idE, token)
                    .then(event => this.setState({ edit: false, event }))
            })
            .catch(err => this.setState({ error: err.message }))
    }

    handleReset = (idE) => {
        logic.retrieveEvent(this.props.id, idE, this.props.token)
        .then(event => this.setState({ event }))
        .catch(err => this.setState({ error: err.message }))
    }

    // handleHire = (idH) => {
    //     logic.closeEvent(this.props.id, idH, this.props.event._id, this.props.token)
    //         .catch(err => this.setState({ error: err.message }))
    // }

    // handleHire = (idH) => {
    //     logic.closeEvent(this.props.id, idH, this.props.idE, this.props.token)
    //         .catch(err => this.setState({ error: err.message }))
    // }

    render() {
        // const { event } = this.props
        const { edit, error, event } = this.state

        const briefing = (event.briefing) ? event.briefing : ""
        // const contactName = (event.contactName) ? event.contactName : ""
        // const contactPhone = (event.contactPhone) ? event.contactPhone : ""

        return (
            <div>
                <HomeButton event={'business/events'} buttonName={'go to events'} />
                {
                    event && (
                        <div className="edit-event">
                            <div className="event-detail-box">
                                <AnEvent event={event} edit={true} />
                            </div>
                            {
                                !edit && (<div className="no-edit">
                                    <h4>A good briefing brings your event to the exit</h4>
                                    <button onClick={this.handleUpdate}>update briefing</button>
                                </div>)
                            }
                            {
                                edit && (
                                    <div className="edit-briefing">
                                        <form onSubmit={this.handleEditSubmit}>
                                            <textarea type="text" defaultValue={briefing} onChange={this.handleBriefing} rows="7" placeholder={"The more detials the worker has, the more eficient is the event. Duties, schedules, lunches, dresscode, explain better the final goal of the event."} ></textarea>
                                            <div className="contact-edit" >
                                                <input className="contact-edit-input" type="text" onChange={this.handleName} placeholder="Contact name" />
                                                <input className="contact-edit-input" type="text" onChange={this.handlePhone} placeholder="Contact phone" />
                                            </div>
                                            <button type="submit">update briefing</button>
                                        </form>
                                    </div>
                                )
                            }
                            {
                                event.candidates.length ? (<div>
                                    <h2 className="candidates-title">CANDIDATES WAITING FOR AN ANSWER: </h2>
                                    {event.candidates.map(hostess => {
                                        return (
                                            <div className="hostess-edit-event">
                                                <Host hostess={hostess} id={this.props.id} idE={this.props.idE} token={this.props.token} handleReset={this.handleReset}/>
                                                {/* <button onClick={() => this.handleHire(hostess._id)}>hire worker and send the briefing</button> */}
                                            </div>
                                        )
                                    })}
                                </div>) : ""
                            }
                            {
                                error && (
                                    <div>{error}</div>
                                )
                            }
                        </div>
                    )
                }

            </div>
        )
    }
}

export default withRouter(EditEvent)