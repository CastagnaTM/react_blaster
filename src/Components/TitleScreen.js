import React, { Component } from 'react'
import Logo from '../Assets/Logo.png'
import HomeScreen from './HomeScreen'
import FlipMove from 'react-flip-move'


export default class TitleScreen extends Component {

    state = { 
        titleScreen: true,
        story: false,
        storyValue: 0
    }

    getStory = () => {
       let story = ["Welcome To React Blaster", "As A Member Of NASA's Space Cleanup Crew, It Is Your Job To Destroy The Debris Orbiting The Earth."
    ]
    return(story[this.state.storyValue])
    }

    loadHomeScreen = () => {
        console.log('hello')
        this.setState({
            story: false,
            titleScreen: false
        })
    }

    loadStory = () => {
        this.setState({
            story: true,
            titleScreen: false
        })
    }

    render(){
        if(this.state.titleScreen === true){
            return(
                <div className='title-screen-background'>
                    <div className='logo-container' style={{display: this.state.story ? 'none' : 'inline-block'}}>
                        <img src={Logo} onClick={() => this.loadStory()}/>
                    </div>
                </div>
            )
        }
        else if(this.state.story === true){
            return(
                <div className='title-screen-background'>
                    <FlipMove
                    duration={1500}
                    appearAnimation="fade"
                    enterAnimation="fade"
                    leaveAnimation="fade"
                    >
                        <div className='story-container'>
                            <p className='story-text'>{this.getStory()}</p>
                            <button className='hvr-shadow-radial' onClick={() => this.loadHomeScreen()} >...</button>
                        </div>
                    </FlipMove>
                </div>
            )
           
        }
        else if(this.state.titleScreen === false && this.state.story == false){
            return(
                <HomeScreen/>
            )
        }
        
    }
}
// logo-container  level select container
//logo  level select