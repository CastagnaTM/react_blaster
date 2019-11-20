import React, { Component } from 'react';
import Tiles from '../Components/Tiles'
import '../App.css'


export default class LevelContainer extends Component{

    state = {
        tiles: [{name: 'one'},{name: 'two'},{name: 'three'},{name: 'four'},{name: 'five'},{name: 'six'},{name: 'seven'},{name: 'eight'},{name: 'nine'},{name: 'ten'},{name: 'eleven'},{name: 'twelve'}]
        
    }


    render() {
        return(
            <div className='tile-grid-container'>
                <div className='tile-grid'>
                    {this.state.tiles.map((tile, i) => <Tiles key={i}{...tile}/>)}
                </div>
            </div>
        )
    }

}