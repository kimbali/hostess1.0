import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import FileBase64 from 'react-file-base64'

class BusinessRegister extends Component {
    state = {
        name: '',
        philosophy: '',
        boss: '',
        phone: '',
        web: '',
        businessCard: '',
        password: '',
        error: ''
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handlePhilo = (event) => {
        this.setState({ philosophy: event.target.value })
    }

    handleBoss = (event) => {
        this.setState({ boss: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleWeb = (event) => {
        this.setState({ web: event.target.value })
    }

    handlePhoto = (photo) => {
        this.setState({ businessCard: photo })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { password, name, web, boss, phone, philosophy, businessCard } = this.state

        logic.editBusinessProfile(this.props.id, password, name, web, boss, phone, philosophy, businessCard.base64, this.props.token)
            .then(() => {
                debugger
                this.props.history.push('/business/home')
            })
            .catch(err => this.setState({ error: err.message }))
    }

    render() {
        return (
            <div>
                <div className="big">
                    <div className="left">
                        <div className="p-box">
                            <p>
                                Ladies, Wine Design was started by Jessica Walsh after this happened and she realized that sometimes women can be competitive or unsupportive of one another. Only a small percent of creative directors are women, and LW&D wants to help change this through mentorship circles, portfolio reviews, talks, and creative meet-ups. In less than two years of launching, we've spread to chapters in over 180 cities all over the world. If you’re a student or creative in NYC and would like to join, please do email us. If you want to join another city chapter's event, check out our city map. It's free to join our events!
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-box">
                            <h2 className="header__title">VIRTUAL BUSINESS CARD</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <input type='text' onChange={this.handleName} placeholder="company name" />
                                </div>
                                <div>
                                    <input type="text" onChange={this.handleBoss} placeholder="your name" />
                                </div>
                                <div>
                                    <input type="text" onChange={this.handlePhone} placeholder="phone number" />
                                </div>
                                <div >
                                    <textarea rows={3} placeholder='Explain to the hostess the main goal of the company' onChange={this.handlePhilo} />
                                </div>
                                <div>
                                    <input type="text" onChange={this.handleWeb} placeholder="link your website" />
                                </div>
                                <div>
                                    <FileBase64 multiple={false} onDone={this.handlePhoto} />
                                </div>
                                <div>
                                    <input type="password" onChange={this.handlePassword} placeholder="password" />
                                </div>
                                {
                                    this.state.error && (
                                        <div className="error">{this.state.error}</div>
                                    )
                                }
                                <div>
                                    <button type="submit">create profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessRegister)