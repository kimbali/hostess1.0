import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class HomeButton extends Component {

    goToProfile = () => {
        this.props.history.push('/')
    }

    handleClose = () => {
        this.props.history.push(`/${this.props.event}`)
    }

    render() {
        return (
            <div className="home-button">
                <div className="home-button-box">
                    <div  className="home-button-icono" >
                        {/* <a onClick={this.goToProfile} className="H" >H</a> */}
                        <a onClick={this.goToProfile}><img src="./image/hostess-icon.png" height="30"></img></a>
                        {/* <a onClick={this.goToProfile}><img src="./image/grey-icon.png" height="30"></img></a> */}
                    </div>
                    {
                        this.props.event && (<div>
                            <button onClick={this.handleClose} className="home-button-close" >close</button>
                        </div>)
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HomeButton)