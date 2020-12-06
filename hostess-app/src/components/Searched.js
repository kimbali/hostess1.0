import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'

// var getAge = require('get-age')

class Searched extends Component {

    state = {
        error: '',
        selected: false
    }

    sendReqest = (idH) => {
        logic.sendRequest(this.props.id, idH, this.props.token)
            .then(() => this.setState({ selected: true }))
            .catch(err => this.setState({ selected: true }))
    }

    render() {

        const { name, origin, languages, myself, photo } = this.props.hostess

        let selected = this.state.selected ? 'selected' : 'searched-host'

        // const age = getAge(birth)

        // let idioms = languages.join(' & ')

        // const selected = (this.state.success) ? ' block-selected ' : ' '

        return (
            <div className={selected} >
                <div className="host">
                    <img src={photo} alt="photo" className="img-hostess padding30" />
                    <h3>{name}</h3>
                    <div className="origin">{origin}</div>
                    <div className="myself" >{myself}</div>
                </div>
                {
                    !this.state.selected && (<button onClick={() => this.sendReqest(this.props.hostess._id)}>send work request</button>)
                }
            </div>
        )
    }
}

export default withRouter(Searched)