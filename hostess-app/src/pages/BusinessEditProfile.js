import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import PasswordUnregister from '../components/PasswordUnregister';
import HomeButton from '../components/HomeButton';
import FileBase64 from 'react-file-base64'

class BusinessEditProfile extends Component {

    state = {
        name: this.props.business.name,
        philosophy: this.props.business.philosophy,
        boss: this.props.business.boss,
        phone: this.props.business.phone,
        web: this.props.business.web,
        businessCard: this.props.business.businessCard,
        password: '',
        error: '',
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
        this.setState({ businessCard: photo.base64 })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { name, web, boss, phone, philosophy, businessCard, password } = this.state

        logic.editBusinessProfile(this.props.id, password, name, web, boss, phone, philosophy, businessCard, this.props.token)
            .then(() => this.props.history.push('/business/profile'))
            .catch(err => this.setState({ error: err.message }))
    }

    render() {

        const { name, boss, phone, philosophy, businessCard, web, error } = this.state

        return (
            <div>
                <HomeButton event={'business/profile'} buttonName={'go to profile'} />
                <div className="big">
                    {/* <div>
                        <img src={this.props.business.businessCard} alt="photo" className="img-business" />
                    </div> */}
                    <div className="left-business">
                        Ladies, Wine Design was started by Jessica Walsh after this happened and she realized that sometimes women can be competitive or unsupportive of one another. Only a small percent of creative directors are women, and LW&D wants to help change this through mentorship circles, portfolio reviews, talks, and creative meet-ups. In less than two years of launching, we've spread to chapters in over 180 cities all over the world. If you’re a student or creative in NYC and would like to join, please do email us. If you want to join another city chapter's event, check out our city map. It's free to join our events!
                    </div>
                    <div className="right">
                        <h2 className="header__title">EDIT PROFILE</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type='text' onChange={this.handleName} value={name} />
                            </div>
                            <div>
                                <input type="text" onChange={this.handleBoss} value={boss} />
                            </div>
                            <div>
                                <input type="text" onChange={this.handlePhone} value={phone} />
                            </div>
                            <div >
                                <textarea rows={5} onChange={this.handlePhilo} value={philosophy} />
                            </div>
                            <div>
                                <input type="text" onChange={this.handleWeb} value={web} />
                            </div>
                            <div>
                                <FileBase64 multiple={false} onDone={this.handlePhoto} />
                            </div>
                            <div>
                                <input type="password" onChange={this.handlePassword} placeholder="password" />
                            </div>
                            <div>
                                <button type="submit">update profile</button>
                            </div>
                        </form>
                        {
                            error && (
                                <div className="error">{error}</div>
                            )
                        }
                        <PasswordUnregister business={true} id={this.props.id} token={this.props.token} onLogout={this.props.onLogout} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessEditProfile)