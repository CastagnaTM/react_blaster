import React, { Component} from 'react'
import '../App.css'
import friendly1 from '../Assets/Friendly1.png'
import friendlySad from '../Assets/FriendlySad.png'



export default class Tiles extends Component{

    state = {
        isClicked: false,
        friendlyBackgroundColor: '#18FCFF'
    }
    
    

    handleClick = () => {
        this.setState({
            isClicked: true,
            friendlyBackgroundColor: '#3F1923'
        })
    }
    
    render() {
        return (
            <div className='tile-target' onClick={this.handleClick}>
                <img className='tile-img' style={{backgroundColor: this.state.friendlyBackgroundColor}} 
                src={this.state.isClicked ? friendlySad : friendly1}/>
            </div>
        )
    }
}