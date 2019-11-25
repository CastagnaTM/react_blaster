import React, { Component } from 'react'


export default class LevelSelector extends Component {


    //this is really just the button that the user clicks to select a level
    render(){
        return(
            <div>
                <button className='hvr-sweep-to-right' onClick={() => this.props.loadLevel(this.props)}>{this.props.name}</button>            
            </div>
        )
    }
}