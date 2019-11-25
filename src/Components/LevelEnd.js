import React, { Component } from 'react'

export default class LevelEnd extends Component {

    handleReturn = () => {
        this.props.levelComplete(this.props.success, this.props.levelPoints)
    }

    render(){
        return(
            <div className='tile-grid-container'>
                <div className='tile-grid'>
                    <div>
                        <p style={{color:'whitesmoke', textAlign: 'center'}}>
                            {this.props.success ? `Congrats! You Scored ${this.props.levelPoints} Points!` : 'Sorry, you lost this time around...'}
                        </p>
                    </div>
                    <div style={{marginLeft: '170px'}}>
                        <button className='hvr-ripple-out' onClick={this.handleReturn} >Return</button>
                    </div>
                </div>
            </div>
        )
    }

}