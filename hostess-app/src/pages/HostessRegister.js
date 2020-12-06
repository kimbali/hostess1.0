import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import FileBase64 from 'react-file-base64'

class HostessRegister extends Component {

    state = {
        id: this.props.id,
        token: this.props.token,
        password: '',
        name: '',
        birth: '',
        origin: '',
        gender: '',
        phone: '',
        languages: [],
        jobType: '',
        myself: '',
        photo: '',
        success: '',
        error: ''
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

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleMyself = (event) => {
        this.setState({ myself: event.target.value })
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    _handleLanguages = (event) => {
        const languages = this.state.languages

        if (event.target.checked && !(this.state.languages.indexOf(event) !== 1)) languages.push(event.target.value)

        this.setState({ languages })
    }


    handleLanguages = (event) => {
        const checked = event.target.checked
        const value = event.target.value
        const languages = this.state.languages

        if (checked) {
            languages.push(value)
        } else {
            const pos = languages.indexOf(value)
            languages.splice(pos, 1)
        }

        this.setState({ languages })
    }


    // handleOtherLanguages = (event) => {
    //     const value = event.target.value
    //     const languages = []
    //     languages.push(value)
    //     this.setState({ otherLanguages: languages })
    // }

    handleJobType = (event) => {
        this.setState({ jobType: event.target.value })
    }

    handlePhoto = (photo) => {
        this.setState({ photo })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { password, name, birth, origin, phone, myself, gender, languages, jobType, photo } = this.state

        logic.editHostessProfile(this.props.id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo.base64, this.props.token)
            .then(() => this.props.history.push('/hostess/home'))
            .catch(err => this.setState({ error: err.message }))
    }

    render() {

        const { error } = this.state

        return (
            <div>
                <div className="big">
                    <div className="right">
                        <h2>CREATE YOUR WORKER PROFILE</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type='text' placeholder="My name is..." onChange={this.handleName} />
                            </div>
                            <div>
                                <input type='text' placeholder="I was born on... DD/MM/YYYY" onChange={this.handleBirth} />
                            </div>
                            <div>
                                <input type='text' placeholder="I come from..." onChange={this.handleOrigin} />
                            </div>
                            <div>
                                <input type="text" placeholder="My phone number... " onChange={this.handlePhone} />
                            </div>
                            <div>
                                <textarea rows={5} placeholder='Brief description about yourself, your interests, your previous jobs, studies, your pasion, hobbies...' onChange={this.handleMyself} />
                            </div>
                            <div className="flex-box">
                                <fieldset data-role="controlgroup" onClick={this.handleGender} className="gender-box">
                                    <legend>Select your gender:</legend>
                                    <input type="radio" name="gender" id="woman" value="W" />
                                    <label for="woman">Woman</label>
                                    <input type="radio" name="gender" id="man" value="M" />
                                    <label for="man">Man</label>
                                </fieldset>
                            </div>
                            <div>
                                <select name="hostess_profile" onClick={this.handleJobType}>
                                    <option value="" disabled hidden selected>What is your hostess profile?</option>
                                    <option value="info">Information hostess - Congreses, conferences, fairs, promotions, desk tasks...</option>
                                    <option value="image">Image hostess - A minimum height of 1'70m is required</option>
                                    <option value="animation">Animation - Dress up, act, dance, animation...</option>
                                    <option value="sells">Comercial profile - Sells</option>
                                </select>
                            </div>
                            <div className="flex-box">
                                <fieldset data-role="controlgroup" className="languages-box" >
                                    <legend>In wich languages do you feel comfortable having a conversation?</legend>
                                    <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} />
                                    <label htmlFor="catalan">catalan</label>
                                    <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages} />
                                    <label htmlFor="spanish">spanish</label>
                                    <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages} />
                                    <label htmlFor="english">english</label>
                                    <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages} />
                                    <label htmlFor="german">german</label>
                                    <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages} />
                                    <label htmlFor="french">french</label>
                                    <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages} />
                                    <label htmlFor="japanese">japanese</label>
                                    {/* <input type="text" name="languages" id="others" placeholder="Any other language?" onChange={this.handleOtherLanguages}/> */}
                                </fieldset>
                            </div>
                            <div className="left">
                                <FileBase64 multiple={false} onDone={this.handlePhoto} />
                            </div>
                            <div>
                                <input type="password" placeholder="password" onChange={this.handlePassword} />
                            </div>
                            <button type="submit" > join to the virtual hostess community</button>
                        </form>
                        {
                            error && (<div className="error">{error}</div>)
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(HostessRegister)
