import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import AnEvent from '../components/AnEvent'
import HomeButton from '../components/HomeButton'

class HostessEvents extends Component {
    state = {
        allEvents: [],
        toConfirm: [],
        toAssist: []
    }

    componentDidMount() {
        logic.retrieveHostess(this.props.id, this.props.token)
            .then(hostess => {
                let eventsToAssist = []
                let eventsToConfirm = []
                let allFree = []

                hostess.toAssist.map(event => eventsToAssist.push(event._id))
                hostess.toConfirm.map(event => eventsToConfirm.push(event._id))

                hostess.accepted.map(business => {
                    business.events.map(event => {
                        if ((!(eventsToAssist.indexOf(event._id) !== -1)) && (!(eventsToConfirm.indexOf(event._id) !== -1)) && (!(event.candidates.indexOf(this.props.id) !== -1))) allFree.push(event)
                    })
                    return true
                })
                this.setState({ allEvents: allFree, toConfirm: hostess.toConfirm, toAssist: hostess.toAssist })
            })
    }

    render() {

        const { allEvents, toConfirm, toAssist } = this.state

        return (
            <div>
                <HomeButton />
                <div className="hostess-events">
                    <div>
                        <h2 className="hostess-events-title green">EVENTS CONFIRMED:</h2>
                        {
                            toAssist.length ? (<div>
                                <div>
                                    {toAssist.map(event => {
                                        return (<div className="hostess-event">
                                            <AnEvent event={event} cardDetails={true} toAssist={true} />
                                        </div>)
                                    })}
                                </div>
                            </div>) : <p>You don't have any event confirmed</p>
                        }
                    </div>
                    <div className="hostess-events-midle-box">
                        <h2 className="hostess-events-title red">CONFIRM YOUR ATTENDANCE FOR THE NEXT EVENTS: </h2>
                        {
                            toConfirm.length ? (<div>
                                <div>
                                    {toConfirm.map(event => {
                                        return (
                                            <div className="hostess-event">
                                                <AnEvent event={event} toConfirm={true} id={this.props.id} token={this.props.token} cardDetails={true} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>) : <p>You don't have any event to be confirmed</p>
                        }
                    </div>
                    <div>
                        <h2 className="hostess-events-title yellow">NEW EVENTS: </h2>
                        {
                            allEvents.length ? (<div>
                                <div>
                                    {
                                        allEvents.map(event => {
                                            return (
                                                <div className="hostess-event">
                                                    <AnEvent event={event} simpleHostess={true} toApply={true} id={this.props.id} token={this.props.token} cardDetails={true} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>) : <p>There are no new events for you to to apply for</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HostessEvents)