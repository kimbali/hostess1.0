import React, { Component } from 'react'
import logic from '../logic'

class BusinessCard extends Component {

    state = {
        button: true
    }

    handleClick = (idB) => {
        logic.acceptRequest(this.props.id, idB, this.props.token)
        .then(() => this.setState({ button: false }))
        .catch(err => this.setState({ button: false }))
    }

    render() {

        const { request, business, profileBusiness } = this.props

        return (
            <div>
                <div className="card">
                    <div className="big big-card">
                        {
                            request && (
                                <div className="left">
                                <img src={business.businessCard} alt="photo" className="photo-card-little" ></img>
                                    {/* <div className="foto card">
                                        {business.businessCard}
                                </div> */}
                                </div>
                            )
                        }
                        <div className="right without-card">
                            <div>
                                <div className="card-business-name" >{business.name}</div>
                                <div>{business.philosophy}</div>
                                <div>{business.web}</div>
                            {
                                !request && profileBusiness && (
                                    <div className="contact-details">
                                        <div className="contact-details-title"><span>Contact details:</span></div>
                                        <div>{business.boss}</div>
                                        <div>{business.phone}</div>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.button && request && (<div>
                        <button onClick={() => this.handleClick(business._id)}>Accept to work with {business.name}</button>
                    </div>)
                }
            </div>
        )
    }
}

export default BusinessCard
