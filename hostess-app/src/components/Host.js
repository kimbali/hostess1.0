import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

// var getAge = require('get-age')

class Host extends Component {

    state = {
        button: true
    }


    handleHire = (idH) => {

        const { id, idE, token } = this.props

        logic.closeEvent(id, idH, idE, token)
            .then(() => {
                this.setState({ button: false })
                this.props.handleReset(idE)
            })
            .catch(err => this.setState({ error: err.message }))
    }

    render() {

        const { name, origin, myself, photo, _id } = this.props.hostess

        // const age = getAge(birth)

        // let idioms = languages.join(' & ')

        // const selected = (this.state.success) ? ' block-selected ' : ' '

        return (
            <div >
                <div className="host">
                    <img src={photo} alt="photo" className="img-hostess" />
                    <h3>{name}</h3>
                    <div className="origin">{origin}</div>
                    <div className="myself" >{myself}</div>
                </div>
                {
                    this.props.error && (<div className="error">{this.props.error}</div>)
                }
                {
                    this.state.button && this.props.idE && (<div>
                        <button onClick={() => this.handleHire(_id)}>hire worker and send the briefing</button>
                    </div>)
                }
            </div>
        )
    }
}

export default withRouter(Host)