import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Searched from '../components/Searched'
import HomeButton from '../components/HomeButton';


class Search extends Component {
    state = {
        gender: '',
        jobType: '',
        languages: [],
        hostesses: [],
        // hostess: {},
        error: '',
        // count = 0 
        selected: false
    }

    handleGender = (event) => {
        this.setState({ gender: event.target.value })
    }

    handleProfile = (event) => {
        this.setState({ jobType: event.target.value })
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

    // handleOtherLanguage = (event) => {
    //     const value = event.target.value
    //     const languages = []
    //     if (value.length) languages.push(value)
    //     this.setState({ otherLanguage: languages })
    // }

    handleSubmit = event => {
        event.preventDefault()

        const { jobType, languages, gender } = this.state

        logic.searchWorkers(this.props.id, gender, languages, jobType, this.props.token)
            .then(hostesses => {
                return this.setState({ hostesses })
            })
    }


    render() {
        return (
            <div>
                <HomeButton />
                <div className="big">
                    <div className="left-search">
                        <div className="search-workers">
                            <h2>SEARCH WORKERS</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div className="flex-box">
                                    <fieldset data-role="controlgroup" onClick={this.handleGender} className="gender-box">
                                        <legend>Select a gender if it is needed:</legend>
                                        <div>
                                            <input type="radio" name="gender" id="woman" value="W"></input>
                                            <label for="woman">Woman</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" id="man" value="M"></input>
                                            <label for="man">Man</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="flex-box">
                                    <fieldset data-role="controlgroup" className="languages-box">
                                        <legend>The hostess needs to speak...</legend>
                                        <input type="checkbox" name="languages" id="catalan" value="catalan" onChange={this.handleLanguages} ></input>
                                        <label htmlFor="catalan">Catalan</label>
                                        <input type="checkbox" name="languages" id="spanish" value="spanish" onChange={this.handleLanguages}></input>
                                        <label for="spanish">Spanish</label>
                                        <input type="checkbox" name="languages" id="english" value="english" onChange={this.handleLanguages}></input>
                                        <label for="english">English</label>
                                        <input type="checkbox" name="languages" id="german" value="german" onChange={this.handleLanguages}></input>
                                        <label for="german">German</label>
                                        <input type="checkbox" name="languages" id="french" value="french" onChange={this.handleLanguages}></input>
                                        <label for="french">French</label>
                                        <input type="checkbox" name="languages" id="japanese" value="japanese" onChange={this.handleLanguages}></input>
                                        <label for="japanese">Japanese</label>
                                        {/* <input type="text" name="languages" id="others" onChange={this.handleOtherLanguage} placeholder="other languages"></input> */}
                                    </fieldset>
                                </div>
                                <div>
                                    <select name="hostess_profile" onClick={this.handleProfile}>
                                        <option value="" disabled hidden selected>What type of profile are you looking for?</option>
                                        <option value="info">Information hostess</option>
                                        <option value="image">Image hostess</option>
                                        <option value="animation">Animation</option>
                                        <option value="sells">Comercial profile</option>
                                        <option value="">All of them</option>
                                    </select>
                                </div>
                                <button type="submit">search workers</button>
                            </form>
                        </div >
                    </div>
                    <div className="right">
                        {
                            this.state.hostesses.length ? (<div>
                                {this.state.hostesses.map(hostess => {
                                    return (
                                        <div>
                                            <Searched hostess={hostess} id={this.props.id} token={this.props.token} selected={this.handleSelected}/>
                                        </div>
                                    )
                                })}
                            </div>) : ""
                        }
                    </div>
                </div>
            </div >
        )
    }
}


export default withRouter(Search)