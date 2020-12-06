import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'


class Landing extends Component {

    state = {
        hostess: false,
        business: false,
        login: false,
        register: false,
        email: '',
        password: '',
        error: ''
    }

    handleemail = (event) => {
        this.setState({ email: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleHostess = () => {
        this.setState({ hostess: true })
    }

    handleBusiness = () => {
        this.setState({ business: true })
    }

    handleHostessRegister = () => {
        this.setState({ register: true, login: false, error: false })
    }

    handleHostessLogin = () => {
        this.setState({ login: true, register: false, error: false })
    }

    handleBusinessRegister = () => {
        this.setState({ register: true, login: false, error: false })
    }

    handleBusinessLogin = () => {
        this.setState({ login: true, register: false, error: false })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { email, password } = this.state

        if (this.state.hostess) {
            if (this.state.register) {
                logic.registerHostess(email, password)
                    .then(() =>
                        logic.authenticateHostess(email, password)
                            .then((res) => {
                                this.props.hostessLogged(res.id, res.token, true)
                            })
                            .catch(err => this.setState({ error: err.message }))
                    )
                    .catch(err => this.setState({ error: err.message }))
            } else {
                logic.authenticateHostess(email, password)
                    .then((res) => this.props.hostessLogged(res.id, res.token, false))
                    .catch(err => this.setState({ error: err.message }))
            }
        }
        if (this.state.business) {
            if (this.state.register) {
                logic.registerBusiness(email, password)
                    .then(() =>
                        logic.authenticateBusiness(email, password)
                            .then((res) => {
                                this.props.businessLogged(res.id, res.token, true)
                            })
                            .catch(err => this.setState({ error: err.message }))
                    )
                    .catch(err => this.setState({ error: err.message }))
            } else {
                logic.authenticateBusiness(email, password)
                    .then((res) => this.props.businessLogged(res.id, res.token, false))
                    .catch(err => this.setState({ error: err.message }))
            }
        }
    }

    handleGoBack = () => {
        this.setState({ business: false, hostess: false, login: false, register: false })
    }

    render() {

        const clickedRegister = (this.state.register || this.state.login) ? ' clicked register ' : ' '
        const clickedLogin = (this.state.login || this.state.register) ? ' clicked login ' : ' '

        return (
            <div className="block">
                <div className="landing">
                    <div className="center">
                        <header>
                            <h1 className="landing-welcome"> WELCOME TO HOSTESS</h1>
                            <p className="landing-welcome-p"> YOUR VIRTUAL HOSTESS AGENCY IN BARCELONA </p>
                        </header>
                        {
                            !this.state.hostess && !this.state.business && (
                                <div className="buttons">
                                    <button type="button" onClick={this.handleHostess} className="buttons-landing">HOSTESS</button>
                                    <button type="button" onClick={this.handleBusiness} className="buttons-landing">BUSINESS</button>
                                </div>
                            )
                        }
                        {
                            this.state.hostess && !this.state.register && !this.state.login && (
                                <div >
                                    <div>
                                        <p className="landing-welcome-p"> I AM A HOSTESS </p>
                                    </div>
                                    <div className="buttons">
                                        <button type="button" onClick={this.handleHostessLogin} className={clickedLogin + ' buttons-landing'}>LOGIN</button>
                                        <button type="button" onClick={this.handleHostessRegister} className={clickedRegister + ' buttons-landing'}>REGISTER</button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.business && !this.state.register && !this.state.login && (
                                <div >
                                    <div>
                                        <p className="landing-welcome-p"> I AM A BUSINESS</p>
                                    </div>
                                    <div className="buttons">
                                        <button type="button" onClick={this.handleBusinessLogin} className={clickedLogin + ' buttons-landing'}>LOGIN</button>
                                        <button type="button" onClick={this.handleBusinessRegister} className={clickedRegister + ' buttons-landing'}>REGISTER</button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.register && this.state.hostess && (
                                <div>
                                    <a href="#" onClick={this.handleBusinessLogin} className={clickedLogin + ' as-landing'}>go to login</a>
                                    <form onSubmit={this.handleSubmit} className="landing-form">
                                        <input className="input-login" type="text" placeholder="hostess@mail.com" onChange={this.handleemail}></input>
                                        <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                        {
                                            this.state.error && (
                                                <div className="error">{this.state.error}</div>
                                            )
                                        }
                                        <div>
                                            <button type="submit" className="submit">REGISTER</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            this.state.register && this.state.business && (
                                <div>
                                    <a href="#" onClick={this.handleBusinessLogin} className={clickedLogin + ' as-landing'}>go to login</a>
                                    <form onSubmit={this.handleSubmit} className="landing-form">
                                        <input className="input-login" type="text" placeholder="business@mail.com" onChange={this.handleemail}></input>
                                        <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                        {
                                            this.state.error && (
                                                <div className="error">{this.state.error}</div>
                                            )
                                        }
                                        <div>
                                            <button type="submit" className="submit">REGISTER</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            this.state.login && this.state.hostess && (
                                <div>
                                    <a href="#" onClick={this.handleBusinessRegister} className={clickedRegister + ' as-landing'}>go to register</a>
                                    <form onSubmit={this.handleSubmit} className="landing-form">
                                        <input className="input-login" type="text" placeholder="hostess@mail.com" onChange={this.handleemail}></input>
                                        <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                        {
                                            this.state.error && (
                                                <div className="error">{this.state.error}</div>
                                            )
                                        }
                                        <div>
                                            <button type="submit" className="submit">LOGIN</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            this.state.login && this.state.business && (
                                <div>
                                    <a href="#" onClick={this.handleBusinessRegister} className={clickedRegister + ' as-landing'}>go to register</a>
                                    <form onSubmit={this.handleSubmit} className="landing-form">
                                        <input className="input-login" type="text" placeholder="business@mail.com" onChange={this.handleemail}></input>
                                        <input className="input-login" type="password" placeholder="password" onChange={this.handlePassword}></input>
                                        {
                                            this.state.error && (
                                                <div className="error">{this.state.error}</div>
                                            )
                                        }
                                        <div>
                                            <button type="submit" className="submit">LOGIN</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        {
                            (this.state.hostess || this.state.business) && (<div className="go-back">
                                <a href="#" onClick={this.handleGoBack} >Go back</a>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Landing)

