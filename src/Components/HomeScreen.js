import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'


export default class HomeScreen extends Component{

    state = {
        play: false
    }

    // top of the screen = level select in game font
    // everything shares a cool background
    // the main of the page holds many components, and stylings for those components
    levelSelect = () => {
        return(
            <div>
                <div className='home-screen-header'>
                    <h4>Select A Level</h4>
                </div>

                <div className='home-screen-body'>
                    <button onClick={() => this.loadLevel()}>Start</button> {/* this will take info later to determine which level */}
                </div>
            </div>
        )
    }
    loadLevel = () => {
        this.setState({
            play: true
        })
    }
    play = () => {
        return (
                <LevelContainer/>
        )
    }



    render() {
        if (this.state.play === false){
            return (
                this.levelSelect()
            )
        } else {
            return (
                this.play()
            )
        }
    }
        
    

}