import React, { Component} from 'react'
import friendly1 from '../Assets/Friendly1.png'
import friendlySad from '../Assets/FriendlySad.png'
import Satellite from '../Assets/Satellite.png'
import Explosion from '../Assets/Explosion.png'
import Bomb from '../Assets/Bomb.png'
import BombEx from '../Assets/BombEx.png'




export default class Targets extends Component{

    state = {
        friendlyBackgroundColor: '#18FCFF',
        debrisBackgroundColor: '#0B162A',
        count: 0
    }

    resetState = () => {
            this.setState({
            isClicked: false,
            backgroundColor: '#18FCFF'
        })
    }
    
    render() {
        if(this.props.target_type === 'debris'){
            return (
                <div className='tile-target' onClick={() => this.props.handleClick(this.props.name, this.props.target_type)} style={{backgroundColor: this.props.isClicked ? '#2F8745' : this.state.debrisBackgroundColor}} >
                    <img className='tile-img' alt="space debris" src={this.props.isClicked ? Explosion : Satellite}/>
                </div>
            )
        } 
        if(this.props.target_type === 'friendly'){
            return(
                <div className='tile-target' onClick={() => this.props.handleClick(this.props.name, this.props.target_type)} style={{backgroundColor: this.props.isClicked ? '#3F1923' : this.state.friendlyBackgroundColor}}>
                    <img className='tile-img' alt='friendly alien' src={this.props.isClicked ? friendlySad : friendly1}/>
                </div>
            )
        }
        if(this.props.target_type === 'bomb'){
            return(
                <div className='tile-target' onClick={() => this.props.handleClick(this.props.name, this.props.target_type)} style={{backgroundColor: this.props.isClicked ? '#3F1923' : this.state.debrisBackgroundColor}}>
                    <img className='tile-img' alt='bomb' src={this.props.isClicked ? BombEx : Bomb}/>
                </div>
            )
        }
       
    }
}