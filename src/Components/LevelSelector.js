import React, { Component } from 'react'
import levelOneGif from '../Assets/GIFS/LevelOneGif.gif'
import levelTwoGif from '../Assets/GIFS/LevelTwoGif.gif'
import levelThreeGif from '../Assets/GIFS/LevelThreeGif.gif'
import BossGif from '../Assets/GIFS/BossGif.gif'


export default class LevelSelector extends Component {

    getGif = (name) => {
        switch(name){
            case 'Level One':
                return levelOneGif;
            case 'Level Two':
                return levelTwoGif;
            case 'Level Three':
                return levelThreeGif;
            case 'Boss Fight!':
                return BossGif
            default :
            return levelOneGif;
        }
    }

    //Loads Level Info And Start Button
    render(){
            return(
                <div>
                    <button className='hvr-sweep-to-right' 
                        style={{display: this.props.showLevelInfo ? 'none ' : 'block'}}
                        onClick={() => this.props.loadLevelInfo()} >{this.props.name}
                    </button> 
                    <div style={{display: this.props.showLevelInfo ? 'block ' : 'none'}}>
                        <div className='info-container'>
                            <button className='hvr-sweep-to-right-start'
                                onClick={() => this.props.loadLevel(this.props)}>Start!
                            </button> 
                            <p className='text' style={{marginLeft: '10%'}}> {this.props.name} {this.props.name === 'Boss Fight!' ? ': Take out the Voyager 1! Destory 12 Asteroids To Make The Boss Appear, And Do As Much Damage As You Can Before It Dissapears Again! Watch Out For Bombs, And Consider A Serious Weapon Upgrade...' : `: Finish The Level With At Least ${this.props.goal} Points!`}</p>
                            <div className='gif-container'>
                                <img className='level-gif' src={this.getGif(this.props.name)} alt="gameplay gif"/>
                                <p className='text' style={{display: this.props.playedOnce ? 'none' : 'block'}}>^ This Is Your In-Game Display. Your Health Meter Is On The Left, Your Game in The Center, And Your "Strikes" For Hitting Aliens And Current Score Are Underneath</p>
                            </div>
                        </div>
                    </div>       
                </div>
            )
    
    }
} 
