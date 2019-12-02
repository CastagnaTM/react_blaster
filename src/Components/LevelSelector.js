import React, { Component } from 'react'
import levelOneGif from '../Assets/GIFS/LevelOneGif.gif'
import levelTwoGif from '../Assets/GIFS/LevelTwoGif.gif'
import levelThreeGif from '../Assets/GIFS/LevelThreeGif.gif'

export default class LevelSelector extends Component {

    getGif = (name) => {
        switch(name){
            case 'Level One':
                return levelOneGif;
            case 'Level Two':
                return levelTwoGif;
            case 'Level Three':
                return levelThreeGif;
            default :
            return levelOneGif;
        }
    }


    //this is really just the button that the user clicks to select a level
    render(){
        if(this.props.name !== 'Boss Fight!'){
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
                            <p className='text'> {this.props.name}: Score At Least {this.props.goal} Points!</p>
                            <div className='gif-container'>
                                <img className='level-gif' src={this.getGif(this.props.name)}/>
                            </div>
                        </div>
                    </div>       
                </div>
            )
        }
        else if(this.props.name === 'Boss Fight!'){
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
                            <p className='text'> {this.props.name}: Take out the source of the debris! This would be a good time to a have a serious weapon upgrade...</p>
                        </div>
                    </div>       
                </div>
            )
        }
    }
} 
// onClick={() => this.props.loadLevel(this.props)}