import React, { Component } from 'react'


export default class LevelSelector extends Component {



    render(){
        return(
            <div>
                <button onClick={() => this.props.loadLevel(this.props)}>{this.props.name}</button>            
            </div>
        )
    }
}