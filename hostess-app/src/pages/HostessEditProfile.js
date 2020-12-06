import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import PasswordUnregister from '../components/PasswordUnregister';
import HomeButton from '../components/HomeButton';
import FileBase64 from 'react-file-base64'

var moment = require('moment');

class HostessEditProfile extends Component {

    state = {
        id: this.props.id,
        token: this.props.token,
        password: '',
        name: this.props.hostess.name,
        birth: this.props.hostess.birth,
        origin: this.props.hostess.origin,
        phone: this.props.hostess.phone,
        myself: this.props.hostess.myself,
        photo: this.props.hostess.photo,
        error: '',
        gender: this.props.hostess.gender,
        languages: this.props.hostess.languages,
        jobType: this.props.hostess.jobType,
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handleBirth = (event) => {
        this.setState({ birth: event.target.value })
    }

    handleOrigin = (event) => {
        this.setState({ origin: event.target.value })
    }

    handlePhone = (photo) => {
        this.setState({ photo })
    }

    handleMyself = (event) => {
        this.setState({ myself: event.target.value })
    }

    handlePhoto = (photo) => {
        this.setState({ photo: photo.base64 })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { password, name, birth, origin, phone, myself, gender, languages, jobType, photo } = this.state

        logic.editHostessProfile(this.props.id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo, this.props.token)
            .then(() => this.props.history.push('/hostess/profile'))
            .catch(err => this.setState({ error: err.message }))
    }

    render() {

        const { error, name, birth, origin, phone, myself, photo } = this.state


        return (
            <div>
                <HomeButton event={'hostess/profile'} buttonName={'go to profile'} />
                <div className="big">
                    <div className="left-photo">
                        <div>
                            <img src={this.props.hostess.photo} alt="photo" className="img-hostess" />
                        </div>
                    </div>
                    <div className="right">
                        <h2>EDIT YOUR PROFILE</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type='text' value={name} onChange={this.handleName} placeholder="My name is..."></input>
                            </div>
                            <div>
                                {/* <input type='text' value={moment(birth).format("DD-MM-YYYY")} onChange={this.handleBirth} placeholder="I was born on the DD/MM/YYYY"></input> */}
                                <input type='text' value={birth} onChange={this.handleBirth} placeholder="I was born on the DD/MM/YYYY"></input>
                            </div>
                            <div>
                                <input type='text' value={origin} onChange={this.handleOrigin} placeholder="I come from..."></input>
                            </div>
                            <div>
                                <input type="text" value={phone} onChange={this.handlePhone} placeholder="My phone number is..." ></input>
                            </div>
                            <div>
                                <textarea rows={5} defaultValue={myself} onChange={this.handleMyself} placeholder="Define yourself (Your pasions, hobbies, studies, interest, peculiarities...)" />
                            </div>
                            <div>
                                <FileBase64 multiple={false} onDone={this.handlePhoto} className="input-base64" />
                            </div>
                            <div>
                                <input type="password" placeholder="password" onChange={this.handlePassword} ></input>
                            </div>
                            <button type="submit">edit profile</button>
                        </form>
                        {
                            error && (<div className="error">{error}</div>)
                        }
                        <PasswordUnregister hostess={true} id={this.props.id} token={this.props.token} onLogout={this.props.onLogout} />
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(HostessEditProfile)
