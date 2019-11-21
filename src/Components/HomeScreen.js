import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
import LevelSelector from '../Components/LevelSelector'


export default class HomeScreen extends Component{

    state = {
        play: false,
        levels: [],
        selectedLevel: null
    }

    // top of the screen = level select in game font
    // everything shares a cool background
    // the main of the page holds many components, and stylings for those components


    componentDidMount = () => {
        this.getLevels()
    }

    levelSelect = () => {
        return(
            <div>
                <div className='home-screen-header'>
                    <h4>Select A Level</h4>
                </div>

                <div className='home-screen-body'>
                    {this.state.levels.map((level, i) => <LevelSelector key={i}{...level} 
                    loadLevel={this.loadLevel}
                    level={this.state.levels}
                    />)}
                </div>
            </div>
        )
    }
    loadLevel = (info) => {
        this.setState({
            play: true
        })
        console.log(info)
        this.play(info)
    }

    getLevels = () => {
        fetch('http://localhost:3000/levels')
        .then(resp => resp.json())
        .then(data => {
           this.setState({
               levels: data
           })
        })
    }

    play = (info) => {
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