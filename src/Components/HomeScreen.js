import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
import LevelSelector from '../Components/LevelSelector'

//this component holds the homescreen, including level selection and potentially other options

export default class HomeScreen extends Component{

    state = {
        playLevel: false,
        levels: [],
        selectedLevel: null,
        totalPoints: 0,
    }

    //calls the fetch to load level options
    componentDidMount = () => {
        this.getLevels()
    }

    //renders buttons for each load-able level
    levelSelect = () => {
        return(
            <div>
                <div className='home-screen-header'>
                    <h4>Select A Level</h4>
                </div>
                <div>
        <p>Your Total Score: {this.state.totalPoints}</p>
                </div>

                <div className='home-screen-body'>
                    {this.state.levels.map((level, i) => <LevelSelector key={i}{...level} 
                    loadLevel={this.loadLevel}
                    />)}
                </div>
            </div>
        )
    }
    //uses info from the levelSelector button to set the selected level, and start the level
    loadLevel = (info) => {
        let obj = info
        this.setState({
            selectedLevel: obj,
            playLevel: true
        })
    }
    //fetches the levels
    getLevels = () => {
        fetch('http://localhost:3000/levels')
        .then(resp => resp.json())
        .then(data => {
           this.setState({
               levels: data
           })
        })
    }

    //renders the levelContainer (AKA the selected level)
    play = () => {
        return (
            <LevelContainer selectedLevel={this.state.selectedLevel}
            levelComplete={this.levelComplete}
            />
        )
    }

    levelComplete = (completed, levelPoints) =>{
        
        if (completed === true){
            this.setState({
            playLevel: false,
            totalPoints: this.state.totalPoints + levelPoints
            })
        }
        else {
            this.setState({
                playLevel: false,
            })
        }
        
    }

    render() {
        //until a level is selected, show the levels avaiable
        if (this.state.playLevel === false){
            return (
                this.levelSelect()
            )
        } 
        //after selected a level, render the level
        else {
            return (
                this.play()
            )
        }
    }
        
    

}