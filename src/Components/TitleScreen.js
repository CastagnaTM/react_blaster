import React, { Component } from 'react'
import Logo from '../Assets/Logo.png'
import HomeScreen from './HomeScreen'

const story = ["Welcome To React Blaster", "As A Member Of NASA's Space Cleanup Crew...", "You Are Tasked With Destroying The Debris Orbiting The Earth...",
   "While On A Recent Mission, You Encounter A Group Of Aliens Attempting To Fly Home...", "However, Their Path Is Blocked By Our Trash..", "This Is Our First Contact With Extraterrestrial Life...",
    "As A Representative Of Earth, You Decide To Clear Their Path And Escort Them Home...", "Target And Destory The Satellites And Asteroids That Appear...", 
    "But Try Not To Blast Your New Friends!"]


export default class TitleScreen extends Component {

    state = { 
        titleScreen: true,
        intro: false,
        storyValue: 0,
        showStart: false
    }

    loadStory = () => {
        this.setState({
            intro: true,
            titleScreen: false
        })
        var introLoop = setInterval(() => {
            console.log(this.state.storyValue)
            this.getNext();
            if(story[this.state.storyValue] === undefined){
                clearInterval(introLoop)
                this.setState({
                    showStart: true
                })
            }
        }, 5000)
    }

    getNext = () => {
        this.setState({
            storyValue: this.state.storyValue+1
        })
    }

    loadHomeScreen = () => {
        this.setState({
            story: null,
            intro: false,
            titleScreen: false
        })
    }

    

    render(){
        if(this.state.titleScreen === true){
            return(
                <div className='title-screen-background'>
                    <div className='logo-container' style={{display: this.state.story ? 'none' : 'inline-block'}}>
                        <img src={Logo} alt="React Blaster" onClick={() => this.loadStory()}/>
                    </div>
                </div>
            )
        }
        else if(this.state.intro === true){
            return(
                <div className='title-screen-background'>
                    <div className='story-container'>
                        <p className='story-text'>{story[this.state.storyValue]}</p>
                        <button className='test'
                        style={{display: this.state.showStart ? 'block' : 'none'}} 
                        onClick={() => this.loadHomeScreen()} >Start</button>
                        </div>
                </div>
            )
           
        }
        else if(this.state.titleScreen === false && this.state.story === null){
            return(
                <HomeScreen/>
            )
        }
        
    }
}
// logo-container  level select container
//logo  level select