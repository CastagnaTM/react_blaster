import React, { Component } from 'react'

const story = ["Your Mission Is Almost Complete...", "As You Approach The Aliens' Homeworld...", "You Encounter A Sentient, Menacing Space Probe...",
 "NASA's 'The Voyager 1'...", "You Must Destroy It To Complete Your Adventure..."]


export default class BossIntro extends Component {

    state = { 
        intro: false,
        storyValue: 0,
        showStart: false
    }

    componentDidMount = () => {
        document.addEventListener('keydown',(event) => {
            if(event.code === 'Space'){
                this.setState({
                    story: null,
                    intro: false,
                    showStart: true
                })
            }
        })
        this.loadStory()
    }

    loadStory = () => {
        this.setState({
            intro: true,
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
            intro: false
        })
    }

    

    render(){
        return(
            <div className='title-screen-background'>
                <div className='story-container'>
                    <div className='text-container' style={{display: this.state.showStart ? 'none' : 'block'}}>
                    <p className='story-text'>{story[this.state.storyValue]}</p>
                    </div>
                    <p className='skip-text' style={{display: this.state.showStart ? 'none' : 'block'}}>Press The Spacebar To Skip...</p>
                    <button className='start-homescreen'
                    style={{display: this.state.showStart ? 'block' : 'none'}} 
                    onClick={() => this.props.handleReturn(false)}>Continue</button>
                    </div>
            </div>
        )
    }
}
