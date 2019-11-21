import React, { Component } from 'react';
import Tiles from '../Components/Tiles'
import '../App.css'
import friendly1 from '../Assets/Friendly1.png'
import friendlySad from '../Assets/FriendlySad.png'



export default class LevelContainer extends Component{

    state = {
        selectedLevel: this.props.selectedLevel,
        // tiles: [{name: 'one'},{name: 'two'},{name: 'three'},{name: 'four'},{name: 'five'},{name: 'six'},{name: 'seven'},{name: 'eight'},{name: 'nine'},{name: 'ten'},{name: 'eleven'},{name: 'twelve'}]
    }
    

    //figure out randomization and then looping
    loadLevelOneGrid = () => {
        let targets = [{target_type: 'debris'},{target_type: 'debris'},{target_type: 'debris'},{target_type: 'friendly'}]
        return targets
    }
    

    loadLevelOne = () => {
       let targets = this.loadLevelOneGrid()
       targets = this.shuffleGrid(targets)
       return (
            <div className='tile-grid-container'>
                <div className='tile-grid'>
                    {targets.map((tile, i) => <Tiles key={i}{...tile}/>)}
                </div>
            </div>
       )
    }

    shuffleGrid = (array) => {
        for (let i = array.length-1; i > 0; i--){
            [array[i], array[Math.floor(Math.random() * (i+1))]] = [array[Math.floor(Math.random() * (i+1))], array[i]]
        }
        return array
    }

    render() {
        return(
            this.loadLevelOne()
        )
    }

}
