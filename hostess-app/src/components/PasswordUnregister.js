import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

class PasswordUnregister extends Component {

    state = {
        changePas: false,
        delete: false,
        oldPassword: '',
        newPassword: '',
        newReapet: '',
        error: '',
        success: false
    }

    handleChangePas = () => this.setState({ changePas: true, error: '', success: false })

    handleUnregister = () => this.setState({ delete: true, error: '', success: false })

    handleNo = event => {
        event.preventDefault()

        this.setState({ changePas: false, delete: false, error: '' })
    }

    handleYes = event => {
        event.preventDefault()

        if (this.props.hostess) {
            return logic.unregisterHostess(this.props.id, this.state.oldPassword, this.props.token)
                .then(() => this.props.onLogout(event))
                .catch(err => this.setState({ error: err.message }))
        }

        if (this.props.business) {
            return logic.unregisterBusiness(this.props.id, this.state.oldPassword, this.props.token)
                .then(() => this.props.onLogout(event))
                .catch(err => this.setState({ error: err.message }))
        }
    }

    handleOld = event => this.setState({ oldPassword: event.target.value })

    handleNew = event => this.setState({ newPassword: event.target.value })

    handleNewNew = event => this.setState({ newReapet: event.target.value })

    handleTheChange = event => {
        event.preventDefault()

        const { oldPassword, newPassword, newReapet } = this.state

        if (newPassword !== newReapet) {
            return this.setState({ error: 'you should use the same new password' })
        } else {
            this.setState({ error: '', success: '' })

            if (this.props.hostess) {
                logic.updatePasswordHostess(this.props.id, oldPassword, newPassword, this.props.token)
                    .then(() => this.setState({ error: '', success: true, changePas: false, delete: false }))
                    .catch(err => this.setState({ error: err.message }))
            }

            if (this.props.business) {
                logic.updatePasswordBusiness(this.props.id, oldPassword, newPassword, this.props.token)
                    .then(() => this.setState({ error: '', success: true, changePas: false, delete: false }))
                    .catch(err => this.setState({ error: err.message }))
            }
        }
    }


    render() {
        return (
            <div className="delete-and-password">
                {
                    !this.state.changePas && !this.state.delete && (
                        <div className="pas-del">
                            <button type="button" onClick={this.handleChangePas} className="deletes-button">change password</button>
                            <button type="button" onClick={this.handleUnregister} className="deletes-button">delete profile</button>
                        </div>
                    )
                }
                {
                    !this.state.changePas && this.state.delete && (
                        <div className="pas-del">
                            <p><span>Are you sure you wana delete the acount for ever?</span></p>
                            <input type="password" onChange={this.handleOld} placeholder="Password"></input>
                            {
                                this.state.error && !this.state.success && (<div className="error">{this.state.error}</div>)
                            }
                            <div className="buttons-del-pass">
                                <button type="button" onClick={this.handleNo} className="deletes-button">go back</button>
                                <button type="button" onClick={this.handleYes} className="deletes-button">bye bye</button>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.changePas && !this.state.delete && (
                        <div className="pas-del">
                            <input type="password" placeholder="Password" onChange={this.handleOld}></input>
                            <input type="password" placeholder="New password" onChange={this.handleNew}></input>
                            <input type="password" placeholder="Repeat it" onChange={this.handleNewNew}></input>
                            {
                                this.state.error && !this.state.success &&  (<div className="error">{this.state.error}</div>)
                            }
                            <div className="buttons-del-pass">
                                <button type="button" onClick={this.handleTheChange} className="deletes-button">change password</button>
                                <button type="button" onClick={this.handleNo} className="deletes-button">go back</button>
                            </div>
                        </div>
                    )
                }
                {
                    this.state.success && (<div className="success">Your password has been updated correctly</div>)
                }
            </div>
        )
    }
}

export default withRouter(PasswordUnregister)