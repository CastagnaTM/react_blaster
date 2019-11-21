import React, { Component } from 'react';
import LevelContainer from '../Containers/LevelContainer'
import LevelSelector from '../Components/LevelSelector'


export default class HomeScreen extends Component{

    state = {
        play: false,
        levels: [],
        selectedLevel: null
    }

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
                    />)}
                </div>
            </div>
        )
    }
    loadLevel = (info) => {
        let obj = info
        this.setState({
            selectedLevel: obj,
            play: true
        })
        
        
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

    play = () => {
        // console.log(this.state.selectedLevel)
        return (
                <LevelContainer selectedLevel={this.state.selectedLevel}/>
        )
    }



    render() {
        if (this.state.play === false){
            return (
                this.levelSelect()
            )
        } 
        else {
            return (
                this.play()
            )
        }
    }
        
    

}